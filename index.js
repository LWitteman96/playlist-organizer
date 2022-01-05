const servestatic = require("serve-static")
const path = require("path")
const express = require("express")
const request = require("request")
const cors = require("cors")

const cookieParser = require("cookie-parser")
const querystring = require("querystring")

const client_secret = "978667b57b134a038bb7444b4f77c0d2"

let port = process.env.PORT || 3000

let router = express.Router()
const app = express()

const serve = servestatic(path.join(path.resolve(), "dist"))

console.log("environment:", process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
	app.use(serve)
}

var corsOptions = {
	origin: "localhost:8080"
}

const allowCrossDomain = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Access-Control-Allow-Headers", "*")
	next()
}

app.use(allowCrossDomain)

// app.use(servestatic(path.join(path.resolve(), 'dist')));
app.use(cors(corsOptions))
app.use(cookieParser())

// router.use((req, res, next) => {
//    res.setHeader('Content-Type', 'application/json');
//    res.setHeader('Access-Control-Allow-Origin', process.env.VUE_APP_API_URL);
//    next();
// })

var client_id = "c643de3168624726afda247ba44e6b52"
var redirect_uri = "http://localhost:3000/callback"

var stateKey = "spotify_auth_state"

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
	console.log("someone is try to login")
	var state = generateRandomString(16)
	res.cookie(stateKey, state)
	console.log("cookie", stateKey, state)
	var scope = "user-read-private user-read-email"

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
	console.log("now here you go again")
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
	} else {
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
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token

				// var options = {
				// 	url: "https://api.spotify.com/v1/me",
				// 	headers: { Authorization: "Bearer " + access_token },
				// 	json: true
				// }

				// // use the access token to access the Spotify Web API
				// request.get(options, function (error, response, body) {
				// 	console.log(body)
				// })

				// we can also pass the token to the browser to make requests from there
				if (process.env.NODE_ENV == "development") {
					res.redirect(
						"http://localhost:8080/success?" +
							querystring.stringify({
								access_token: access_token,
								refresh_token: refresh_token
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
			} else {
				res.redirect(
					"?" +
						querystring.stringify({
							error: "invalid_token"
						})
				)
			}
		})
	}
})

app.use("/api", router)

app.listen(port, () => {
	console.log("API server started on " + port)
})
