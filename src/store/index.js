import { createStore } from "vuex"

import user from "./modules/user"
import webplayback from "./modules/webplayback"

export default createStore({
	modules: {
		user,
		webplayback
	}
})
