const servestatic = require("serve-static")
const path = require("path")
const express = require("express")
const request = require("request")
const cors = require("cors")

const cookieParser = require("cookie-parser")
const querystring = require("querystring")

require("dotenv").config()

const client_secret = process.env.CLIENT_SECRET
const client_id = process.env.CLIENT_ID
const port = process.env.PORT || 3000
const redirect_uri =
	process.env.REDIRECT_URI || "http://localhost:3000/callback"
const stateKey = "spotify_auth_state"

let router = express.Router()
const app = express()
app.use(cookieParser())

app.use((req, res, next) => {
	res.append("Access-Control-Allow-Origin", ["*"])
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
	res.append("Access-Control-Allow-Headers", "Content-Type")
	next()
})

console.log("environment:", process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
	app.use(servestatic(path.join(path.resolve(), "dist")))
}

const generateRandomString = (length) => {
	let text = ""
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/dist/index.html"))
})

app.get("/success", function (req, res) {
	res.sendFile(path.join(__dirname, "/dist/index.html"))
})

app.get("/login", function (req, res) {
	var state = generateRandomString(16)
	res.cookie(stateKey, state)
	var scope =
		"user-read-private user-read-email user-library-read streaming user-read-playback-state user-modify-playback-state user-read-playback-position playlist-modify-private playlist-read-collaborative playlist-modify-public"

	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state
			})
	)
})

app.get("/callback", function (req, res) {
	const code = req.query.code || null
	const state = req.query.state || null

	const storedState = req.cookies ? req.cookies[stateKey] : null

	// let form = new FormData()

	if (state === null || state !== storedState) {
		res.redirect(
			"/#" +
				querystring.stringify({
					error: "state_mismatch"
				})
		)
	}
	res.clearCookie(stateKey)
	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			code: code,
			redirect_uri: redirect_uri,
			grant_type: "authorization_code"
		},
		headers: {
			Authorization:
				"Basic " +
				new Buffer(client_id + ":" + client_secret).toString("base64"),
			"Content-Type": "application/x-www-form-urlencoded"
		},
		json: true
	}
	request.post(authOptions, function (error, response, body) {
		console.log(response.statusCode)
		if (error && response.statusCode != 200) {
			console.error("request has failed. No authorization token was fetched.")
			res.redirect(
				"?" +
					querystring.stringify({
						error: "invalid_token"
					})
			)
		}
		var access_token = body.access_token,
			refresh_token = body.refresh_token
		var options = {
			url: "https://api.spotify.com/v1/me",
			headers: { Authorization: "Bearer " + access_token },
			json: true
		}
		request.get(options, function (error, response, body) {
			console.log(body)
			const id = body.id
			if (error && response.statusCode != 200) {
				console.error("request has failed. No authorization token was fetched.")
			}
			if (process.env.NODE_ENV == "development") {
				res.redirect(
					"http://localhost:8080/success?" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
							id: id
						})
				)
			} else {
				res.redirect(
					"/success?" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token
						})
				)
			}
		})
	})
})

app.use("/api", router)

app.listen(port, () => {
	console.log("API server started on " + port)
})
