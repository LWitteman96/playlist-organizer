<template>
	<div class="container">
		
	</div>
</template>

<script>

export default {
	name: "Login",
	components: {},
	created () {
			if (process.env.NODE_ENV == "development") {
				window.location.href = "/api/login"
			} else {
				window.location.href = "/login"
			}
		}

}

</script>

<style lang="css" scoped>
.container {
	width: 80vw;
	height: 50vh;
	background: lightblue;
}
</style>
