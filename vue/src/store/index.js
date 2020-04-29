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
		setAccessToken(ctx, accessToken) {
			localStorage.setItem('access_token', accessToken)
		},
		setRefreshToken(ctx, refreshToken) {
			localStorage.setItem('refresh_token', refreshToken)
		},
		setExpiresIn(ctx, expiresIn) {
			localStorage.setItem('expires_in', expiresIn)
		},
		async updateTokens({ dispatch, commit }) {
			if (!localStorage.getItem('refresh_token')) {
				return
			}
			try {
				const { data } = await this._vm.$api.autch.refreshToken(
					localStorage.getItem('refresh_token')
				)
				dispatch('setAccessToken', data.access_token)
				dispatch('setRefreshToken', data.refresh_token)
				dispatch('setExpiresIn', data.expires_in)
				await dispatch('auth/loadUser')
			} catch {
				dispatch('resetLocalStorage')
				commit('resetState')
			}
		},
		resetLocalStorage({ dispatch }) {
			dispatch('setAccessToken', null)
			dispatch('setRefreshToken', null)
			dispatch('setExpiresIn', null)
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
