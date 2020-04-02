import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import tests from './modules/tests'

Vue.use(Vuex)

// used to reset store
let initialState = cloneDeep({
	tests: tests.state,
})

const store = new Vuex.Store({
	namespaced: true,
	modules: {
		tests,
	},
	mutations: {
		resetState(state) {
			Object.keys(initialState).forEach(key => {
				state[key] = initialState[key]
			})
			initialState = cloneDeep(initialState)
		},
	},
})

export default store
