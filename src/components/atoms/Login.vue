<script>
export default {
	name: "Login",
	components: {},
	created() {
		if (process.env.NODE_ENV == "development") {
			window.location.href = "/api/login"
		} else {
			window.location.href = "/login"
		}
	}
}
</script>
