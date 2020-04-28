export default {
	namespaced: true,
	state: {
		isAuthentication: false,
		user: null,
		accessToken: localStorage.getItem('access_token'),
		refreshToken: localStorage.getItem('refresh_token'),
		expiresIn: localStorage.getItem('expires_in'),
	},
	mutations: {
		setAuthentication(state, isAuthentication) {
			state.isAuthentication = isAuthentication
		},
		setAccessToken(state, accessToken) {
			localStorage.setItem('access_token', accessToken)
			state.accessToken = accessToken
		},
		setRefreshToken(state, refreshToken) {
			localStorage.setItem('refresh_token', refreshToken)
			state.refreshToken = refreshToken
		},
		setExpiresIn(state, expiresIn) {
			localStorage.setItem('expires_in', Date.now() / 1000 + expiresIn)
			state.expiresIn = expiresIn
		},
		setUser(state, { name, email, localId: id }) {
			state.user = {
				name,
				email,
				id,
			}
		},
	},
	actions: {
		initialData({ commit }, userInfo) {
			const {
				displayName: name,
				email,
				localId,
				idToken,
				refreshToken,
				expiresIn,
			} = userInfo

			commit('setAccessToken', idToken)
			commit('setRefreshToken', refreshToken)
			commit('setExpiresIn', expiresIn)
			commit('setUser', { name, email, localId })
		},
		async signUpHandler({ dispatch }, { name, email, password }) {
			try {
				const { data } = await this._vm.$api.autch.sendSignUp(
					name,
					email,
					password
				)
				dispatch('initialData', data)
				return false
			} catch (error) {
				return error
			}
		},
		async signInHandler({ commit, dispatch }, { email, password }) {
			try {
				const { data } = await this._vm.$api.autch.sendSignIn(email, password)
				dispatch('initialData', data)
				commit('setAuthentication', true)
				return false
			} catch (error) {
				return error
			}
		},
	},
}
