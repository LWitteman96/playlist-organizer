<template>
	<div class="home">
		<router-link v-if="!authenticated" to="/login">login</router-link>
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
