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
	state: {
		serverErrors: [403, 404, 405, 415, 422, 429, 500],
		errorsApi: {
			403: {
				title: 'Forbidden',
				message: 'This resource is not intended for public access',
			},
			404: {
				title: 'Not found',
				message: 'Try searching at a different address',
			},
			405: {
				title: 'Method not allowed',
				message: 'Invalid resource request method',
			},
			415: {
				title: 'Unsupported Media-Type',
				message: 'Part of the request was made in an unsupported format',
			},
			422: {
				title: 'Unprocessable Entity',
				message:
					'The request is accepted and understood, but cannot be completed due to semantic errors',
			},
			429: {
				title: 'Too Many Requests',
				message: 'Too many requests in a short amount of time',
			},
			500: {
				title: 'Internal server error',
				message: 'The server cannot process the request due to internal errors',
			},
		},
	},
	actions: {
		async initial({ dispatch }) {
			try {
				if (!localStorage.getItem('refresh_token')) {
					return
				}
				await dispatch('updateTokens')
			} catch {}
		},
		resetLocalStorage() {
			localStorage.clear()
		},
		async updateTokens({ commit, dispatch }) {
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
		notification(_, { type = '', title = '', text = '' }) {
			Vue.notify({ type, title, text, speed: 500 })
		},
		notificationServerError({ state }, status) {
			if (status && state.serverErrors.includes(status)) {
				Vue.notify({
					type: 'error',
					title: state.errorsApi[status].title,
					text: state.errorsApi[status].message,
					speed: 500,
				})
			} else {
				Vue.notify({
					type: 'error',
					title: 'Unknown error',
					text: 'Try reloading the page',
					speed: 500,
				})
			}
		},
	},
	mutations: {
		setAccessToken(_, accessToken) {
			localStorage.setItem('access_token', accessToken)
		},
		setRefreshToken(_, refreshToken) {
			localStorage.setItem('refresh_token', refreshToken)
		},
		setExpiresIn(_, expiresIn) {
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
