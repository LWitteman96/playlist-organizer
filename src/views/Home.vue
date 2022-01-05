<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<router-link v-if="!authenticated" to="/login">login</router-link>
		<AfterLogin v-if="authenticated" />
	</div>
</template>

<script>
// @ is an alias to /src
// import WelcomeScreen from "@/components/WelcomeScreen.vue"
import AfterLogin from "./AfterLogin.vue"
import { mapState } from "vuex"

export default {
	name: "Home",
	components: {
		AfterLogin
	},
	computed: {
		...mapState({
			authenticated: (state) => state.user.userInfo.authenticated
		})
	},
	created: function () {
		console.log("this one: ", window.location)
	},
	methods: {}
}
</script>
