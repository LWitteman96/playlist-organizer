import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import WelcomeScreen from "../components/WelcomeScreen.vue"
import AfterLogin from "../components/AfterLogin.vue"
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
    component: WelcomeScreen
		// beforeEnter() {
		// 	if (process.env.NODE_ENV == "development") {
		// 		window.location.href = "/api/login"
		// 	} else {
		// 		window.location.href = "/login"
		// 	}
		// }
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
