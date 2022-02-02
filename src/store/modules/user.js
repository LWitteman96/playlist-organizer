import client from "../../api/fetchClient"

const state = {
	userInfo: {
		authenticated: false,
		access_token: null,
		refresh_token: null,
		playlists: {},
		NinePlaylists: [],
		savedTracks: []
	}
}

const getters = {
	AccessToken: (state) => state.userInfo.access_token,
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
		commit("setNinePlaylists")
	},
	async fetchSavedTracklist({ commit }) {
		const result = await client("me/tracks?limit=50", {
			token: state.userInfo.access_token
		})
		commit("addSavedTracks", result.items)
	},
	async addItemToPlaylist({ rootState }, index) {
		const playlist_id = state.NinePlaylists[index].id
		const result = await client(`/playlists/${playlist_id}/tracks`, {
			token: state.userInfo.access_token,
			method: "POST",
			body: {
				position: 0,
				uris: rootState.webplayback.playbackState.track_window
					.current_track.uri
			}
		})
		console.log("addItemToPlaylist", result)
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
	},
	setNinePlaylists: (state) => {
		;(state.userInfo.NinePlaylists =
			state.userInfo?.playlists?.items?.slice(0, 9))(
			(state.userInfo.playlists.items =
				state.userInfo.playlists.items.slice(9))
		)
	},
	unpinPlaylist: (state, playlist) => {
		state.userInfo.playlists.items.unshift(
			state.userInfo.NinePlaylists[playlist]
		)
		state.userInfo.NinePlaylists = state.userInfo.NinePlaylists.filter(
			(item, index) => playlist !== index
		)
	},
	pinPlaylist: (state, playlist) => {
		if (state.userInfo.NinePlaylists.length < 9) {
			state.userInfo.NinePlaylists.push(
				state.userInfo.playlists.items[playlist]
			)
			state.userInfo.playlists.items =
				state.userInfo.playlists.items.filter(
					(item, index) => playlist !== index
				)
		} else {
			console.error("Can't pin another playlist")
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
