const state = {
	authenticated: false
}

const getters = {}

const actions = {}

const mutations = {
	toggleAuthenticated: (state) => (state.authenticated = !state.authenticated)
}

export default {
	state,
	getters,
	actions,
	mutations
}
