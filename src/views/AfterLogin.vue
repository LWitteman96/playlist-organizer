<template>
	<div class="main">
		<TrackList class="tracklist" />
		<TileGrid class="tilegrid" />
		<div class="playlist-lists">
			<PinnedPlaylists class="pinned-playlists" />
			<AllPlaylists class="all-playlists" />
		</div>
		<PlayBackTray class="play-back-tray" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"

import TileGrid from "../components/molecules/TileGrid.vue"
import PinnedPlaylists from "../components/molecules/PinnedPlaylists.vue"
import AllPlaylists from "../components/molecules/AllPlaylists.vue"
import TrackList from "../components/molecules/TrackList.vue"
import PlayBackTray from "../components/molecules/PlayBackTray.vue"

export default {
	name: "AfterLogin",
	components: {
		TileGrid,
		PinnedPlaylists,
		AllPlaylists,
		TrackList,
		PlayBackTray
	},
	computed: {
		...mapState({
			authenticated: (state) => state.user.userInfo.authenticated,
			access_token: (state) => state.user.userInfo.access_token,
			playlists: (state) => state.user.userInfo.playlists.items
		})
	},
	created() {
		this.$store.commit("toggleAuthenticated")
		const authCreds = this.getHashParams()
		this.$store.commit("set_tokens", authCreds)
		if (this.access_token) {
			window.history.pushState({}, document.title, "/")
			console.log("calling fetchPlaylists")
			this.fetchPlaylists()
			console.log("calling webplayer")
			console.log(`this is the access token ${this.access_token}`)
			this.initializeSpotifyWebPlay()
		}
	},
	methods: {
		...mapMutations(["toggleAuthenticated", "set_tokens"]),
		...mapActions(["fetchPlaylists", "initializeSpotifyWebPlay"]),
		getHashParams() {
			const params = new URLSearchParams(document.location.search)
			const access_token = params.get("access_token")
			const refresh_token = params.get("refresh_token")
			return { access_token, refresh_token }
		}
	}
}
</script>

<style lang="css" scoped>
.main {
	display: flex;
	position: relative;
	/* justify-content: center; */
	/* align-items: center; */
}

.playlist-lists {
	display: flex;
	flex-direction: column;
	margin-top: 10vh;
}

.tracklist {
	/* justify-self: end; */
}
.play-back-tray {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 5em;
}
</style>
