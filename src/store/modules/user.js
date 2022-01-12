import client from "../../api/fetchClient"

const state = {
	userInfo: {
		authenticated: false,
		access_token: null,
		refresh_token: null,
		playlists: {},
		savedTracks: []
	}
}

const getters = {
	AccessToken: (state) => state.userInfo.access_token,
	NinePlaylists: (state) => {
		let nine = state.userInfo.playlists?.items?.slice(0, 9)
		return nine
	},
	AllPlaylists: (state) => state.userInfo.playlists,
	savedTracks: (state) => state.userInfo.savedTracks
}

const actions = {
	async fetchPlaylists({ commit }) {
		const result = await client("me/playlists?limit=40", {
			token: state.userInfo.access_token
		})
		console.log("result", result)
		commit("setUserPlaylists", result)
	},
	async fetchSavedTracklist({ commit }) {
		const result = await client("me/tracks?limit=50", {
			token: state.userInfo.access_token
		})
		commit("addSavedTracks", result.items)
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
		(state.userInfo.playlists = playlists),
	addSavedTracks: (state, tracks) => {
		if (!state.userInfo.savedTracks.length) {
			state.userInfo.savedTracks = tracks
		} else {
			state.userInfo.savedTracks.push(tracks)
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
