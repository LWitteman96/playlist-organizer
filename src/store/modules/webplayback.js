import client from "../../api/fetchClient"

const state = {
	playerReady: false,
	is_playing: false
}

const getters = {
	is_playing: (state) => state.is_playing
}

const actions = {
	async initializeSpotifyWebPlay({ commit, rootGetters }) {
		const token = rootGetters.AccessToken
		window.onSpotifyWebPlaybackSDKReady = async () => {
			const player = new window.Spotify.Player({
				name: "Web Playback SDK",
				getOAuthToken: (cb) => {
					cb(token)
				},
				volume: 0.5
			})
			const connected = await player.connect()
			console.log("Connected:", connected)
			console.log("window.spotify", window.Spotify)
			player.addListener("ready", async ({ device_id }) => {
				commit("togglePlayerReady", device_id)
				console.log("Ready with Device ID", device_id)
			})
			player.addListener("player_state_changed", (response) => {
				commit("setPlaybackState", response)
				commit("setIsPlaying", !response.paused)
			})

			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id)
			})

			player.on("initialization_error", ({ message }) => {
				console.error("Failed to initialize", message)
			})

			player.on("account_error", ({ message }) => {
				console.error("Failed to validate Spotify account", message)
			})

			player.on("playback_error", ({ message }) => {
				console.error("Failed to perform playback", message)
			})
		}
	},
	async getPlaybackState({ rootGetters, commit }) {
		console.log("called startPlayBack")
		const result = await client("me/player", {
			token: rootGetters.AccessToken
		})
		console.log("PlaybackState: ", result)
		commit("setInitialPlaybackState", result)
	},
	async transferPlayBack({ rootGetters }, device_id) {
		const result = await client("me/player", {
			token: rootGetters.AccessToken,
			method: "PUT",
			body: { device_ids: [device_id], play: false }
		})
		console.log(`transferPlayback result ${result}`)
	},
	async getAvailableDevices({ rootGetters }) {
		const result = await client("me/player/devices", {
			token: rootGetters.AccessToken
		})
		console.log("Available devices", result)
	},
	async startResume({ rootGetters }, { device_id, ...config }) {
		let result
		if (config.tracks) {
			console.log("triggered start with tracks")
			result = await client(`me/player/play?${device_id}`, {
				token: rootGetters.AccessToken,
				method: "PUT",
				body: {
					uris: [config.tracks]
				}
			})
		} else {
			console.log("triggered start without tracks, loaded savedTracks")
			result = await client(`me/player/play?${device_id}`, {
				token: rootGetters.AccessToken,
				method: "PUT",
				body: {
					uris: rootGetters.savedTracksUris
				}
			})
		}
		console.log("startResume", result)
	},
	async pause({ rootGetters }, device_id) {
		const result = await client(`me/player/pause?${device_id}`, {
			token: rootGetters.AccessToken,
			method: "PUT"
		})
		console.log("pause", result)
	},
	async skipToNext({ rootGetters }, device_id) {
		const result = await client(`me/player/next?${device_id}`, {
			token: rootGetters.AccessToken,
			method: "POST"
		})
		console.log("next", result)
	},
	async skipToPrevious({ rootGetters }, device_id) {
		const result = await client(`me/player/previous?${device_id}`, {
			token: rootGetters.AccessToken,
			method: "POST"
		})
		console.log("previous", result)
	},
	async toggleShuffle({ rootGetters }, device_id) {
		const result = await client(
			`me/player/shuffle?${device_id}&state=${!state?.playbackState?.shuffle}`,
			{
				token: rootGetters.AccessToken,
				method: "PUT"
			}
		)
		console.log("shuffle", result)
	},
	async setVolume({ rootGetters }, device_id) {
		const result = await client(
			`me/player/volume?device_id=${device_id}&volume_percent=${state.volumeLevel}`,
			{
				token: rootGetters.AccessToken,
				method: "PUT"
			}
		)
		console.log("previous", result)
	}
}

const mutations = {
	togglePlayerReady: (state, device_id) => (
		(state.playerReady = !state.playerReady), (state.this_device = device_id)
	),
	setPlaybackState: (state, playbackState) =>
		(state.playbackState = playbackState),
	setInitialPlaybackState: (state, playbackState) =>
		(state.is_playing = playbackState.is_playing),
	setIsPlaying: (state, playbackState) => (state.is_playing = playbackState),
	updateVolume: (state, volume) => (state.volumeLevel = volume)
}

export default {
	state,
	getters,
	actions,
	mutations
}
