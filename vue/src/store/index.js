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
		async initial({ dispatch }) {
			try {
				await dispatch('updateTokens')
			} catch {}
		},
		resetLocalStorage({ commit }) {
			commit('setAccessToken', null)
			commit('setRefreshToken', null)
			commit('setExpiresIn', null)
		},
		async updateTokens({ commit, dispatch }) {
			if (!localStorage.getItem('refresh_token')) {
				return
			}
			try {
				const { data } = await this._vm.$api.auth.refreshToken(
					localStorage.getItem('refresh_token')
				)
				commit('setAccessToken', data.access_token)
				commit('setRefreshToken', data.refresh_token)
				commit('setExpiresIn', data.expires_in)
				await dispatch('auth/loadUser')
			} catch {
				dispatch('resetLocalStorage')
				commit('resetState')
			}
		},
	},
	mutations: {
		setAccessToken(ctx, accessToken) {
			localStorage.setItem('access_token', accessToken)
		},
		setRefreshToken(ctx, refreshToken) {
			localStorage.setItem('refresh_token', refreshToken)
		},
		setExpiresIn(ctx, expiresIn) {
			localStorage.setItem('expires_in', expiresIn)
		},
		resetState(state) {
			Object.keys(initialState).forEach(key => {
				state[key] = initialState[key]
			})
			initialState = cloneDeep(initialState)
		},
	},
})

export default store
