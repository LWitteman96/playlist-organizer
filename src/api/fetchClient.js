export default function client(endpoint, { body, ...customConfig } = {}) {
	const headers = { "content-type": "application/json" }
	const base_url = process.env.SPOTIFY_BASE_URL
		? process.env.SPOTIFY_BASE_URL
		: "https://api.spotify.com/v1"
	if (customConfig.token) {
		headers.Authorization = `Bearer ${customConfig.token}`
	}
	const config = {
		method: body ? "POST" : "GET",
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers
		}
	}
	if (body) {
		config.body = JSON.stringify(body)
	}

	console.log("gonna fetch now with config", config)
	return window
		.fetch(`${base_url}/${endpoint}`, config)
		.then(async (response) => {
			if (response.ok) {
				console.log(response.status)
				return await response.json()
			} else {
				const errorMessage = await response.text()
				console.log("something went wrong....")
				return Promise.reject(new Error(errorMessage))
			}
		})
}
