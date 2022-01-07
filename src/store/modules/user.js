const state = {
	userInfo: {
		authenticated: false,
		access_token: null,
		refresh_token: null,
		playlists: {}
	}
}

const getters = {
	AccessToken: (state) => state.userInfo.access_token,
	NinePlaylists: (state) => {
		let nine = state.userInfo.playlists?.items?.slice(0, 9)
		return nine
	},
	AllPlaylists: (state) => state.userInfo.playlists
}

const actions = {
	async fetchPlaylists({ commit }) {
		const options = {
			method: "GET",
			headers: {
				Authorization: "Bearer " + state.userInfo.access_token,
				"Content-Type": "application/json"
			},
			json: true
		}
		try {
			const response = await fetch(
				"https://api.spotify.com/v1/me/playlists?limit=40",
				options
			)
			const result = await response.json()
			commit("setUserPlaylists", result)
		} catch (error) {
			console.log(error)
		}
	}
}

const mutations = {
	toggleAuthenticated: (state) =>
		(state.userInfo.authenticated = !state.userInfo.authenticated),
	set_tokens: (state, tokens) => (
		(state.userInfo.access_token = tokens.access_token),
		(state.userInfo.refresh_token = tokens.refresh_token)
	),
	setUserPlaylists: (state, playlists) =>
		(state.userInfo.playlists = playlists)
}

export default {
	state,
	getters,
	actions,
	mutations
}
