<template>
	<div>
		<h1>Yeey you are logged in.</h1>
		<div v-for="playlist in this.playlists" :key="playlist.id">
			{{ playlist.name }}
			<img :src="`${playlist.images[0].url}`" alt="" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"

export default {
	name: "AfterLogin",
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

<style lang="scss" scoped></style>
