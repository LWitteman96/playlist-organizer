<template>
	<div class="home">
		<div class="login">
			<img
				class="spotify-icon"
				src="../assets/Spotify_Icon_RGB_Green.png"
				alt=""
			/>
			<router-link v-if="!authenticated" to="/login" class="login-link"
				>Login</router-link
			>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"

export default {
	name: "Home",
	components: {},
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

<style scoped>
.login {
	background: var(--primary-black);
	font-size: 1.8rem;
	height: 4rem;
	width: 10rem;
	border-radius: 50px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

.login-link {
	text-decoration: none;
	color: var(--primary-green);
}

.spotify-icon {
	width: 2rem;
	/* background: purple; */
	height: 2rem;
}
</style>
