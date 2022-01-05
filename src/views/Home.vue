<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<router-link to="/login">login</router-link>
		<AfterLogin v-if="authenticated" />
	</div>
</template>

<script>
// @ is an alias to /src
// import WelcomeScreen from "@/components/WelcomeScreen.vue"
import AfterLogin from "@/components/AfterLogin.vue"
import { mapState } from "vuex"

export default {
	name: "Home",
	components: {
		AfterLogin
	},
	computed: {
		...mapState({
			authenticated: (state) => state.user.authenticated
		})
	},
	created: function () {
		console.log(window.location)
	},
	methods: {
		// getHashParams() {
		// 	var hashParams = {}
		// 	var e,
		// 		r = /([^&;=]+)=?([^&;]*)/g,
		// 		q = window.location.hash.substring(1)
		// 	while ((e = r.exec(q))) {
		// 		hashParams[e[1]] = decodeURIComponent(e[2])
		// 	}
		// 	return hashParams
		// }
	}
}
</script>
