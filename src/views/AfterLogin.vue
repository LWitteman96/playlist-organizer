<template>
	<div class="main">
		<TileGrid />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"

import TileGrid from "../components/molecules/TileGrid.vue"

export default {
	name: "AfterLogin",
	components: {
		TileGrid
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
		}
	},
	methods: {
		...mapMutations(["toggleAuthenticated", "set_tokens"]),
		...mapActions(["fetchPlaylists"]),
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
/* .main {
	width: 100vw;
	height: 100vh;
} */
</style>
