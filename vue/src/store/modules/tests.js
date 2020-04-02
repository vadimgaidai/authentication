export default {
	namespaced: true,
	state: {
		tests: [],
	},
	mutations: {
		setTests(state, val) {
			state.tests = val
		},
	},
	actions: {
		async loadTests({ commit }) {
			try {
				const response = await this._vm.$api.tests.GetTests()
				commit('setTests', response.data)
			} catch (error) {
				console.log(error)
			}
		},
	},
}
