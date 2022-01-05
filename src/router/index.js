import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../components/atoms/Login.vue"
import AfterLogin from "../views/AfterLogin.vue"
import store from "../store"
// import store from "../store"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue")
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/success",
		name: "Success",
		component: AfterLogin
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.afterEach(() => {
	if (window.location.path == "/success") {
		store.commit("toggleAuthenticated")
	}
})

export default router
