import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

import auth from './modules/auth'

Vue.use(Vuex)

let initialState = cloneDeep({
	auth: auth.state,
})

const store = new Vuex.Store({
	namespaced: true,
	modules: {
		auth,
	},
	actions: {
		async initial({ dispatch, state }) {
			const { auth: autchModule } = state
			try {
				await dispatch('updateTokens')
				if (autchModule.isAuthentication) {
					// fetch user
				}
			} catch {}
		},
		setAccessToken(state, accessToken) {
			localStorage.setItem('access_token', accessToken)
		},
		setRefreshToken(state, refreshToken) {
			localStorage.setItem('refresh_token', refreshToken)
		},
		setExpiresIn(state, expiresIn) {
			localStorage.setItem('expires_in', Date.now() / 1000 + expiresIn)
		},
		async updateTokens({ dispatch, commit }) {
			if (!localStorage.getItem('refresh_token')) {
				return
			}
			try {
				const { data } = await this._vm.$api.autch.refreshToken()
				dispatch('setAccessToken', data.access_token)
				dispatch('setRefreshToken', data.refresh_token)
				dispatch('setExpiresIn', data.expires_in)
			} catch {
				dispatch('resetLocalStorage')
				commit('resetState')
			}
		},
		resetLocalStorage() {
			localStorage.setItem('access_token', null)
			localStorage.setItem('refresh_token', null)
			localStorage.setItem('expires_in', null)
		},
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
