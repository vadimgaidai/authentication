export default {
	namespaced: true,
	state: {
		isAuthentication: false,
		user: null,
	},
	mutations: {
		setAuthentication(state, isAuthentication) {
			state.isAuthentication = isAuthentication
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
		setData({ commit, dispatch }, userInfo = {}) {
			const {
				displayName: name,
				email,
				localId,
				idToken,
				refreshToken,
				expiresIn,
			} = userInfo

			dispatch('setAccessToken', idToken, { root: true })
			dispatch('setRefreshToken', refreshToken, { root: true })
			dispatch('setExpiresIn', expiresIn, { root: true })
			commit('setUser', { name, email, localId })
		},
		async signUpHandler({ dispatch }, { name, email, password }) {
			try {
				const { data } = await this._vm.$api.autch.sendSignUp(
					name,
					email,
					password
				)
				dispatch('setData', data)
				return false
			} catch (error) {
				console.log(error)

				return error
			}
		},
		async signInHandler({ commit, dispatch }, { email, password }) {
			try {
				const { data } = await this._vm.$api.autch.sendSignIn(email, password)
				dispatch('setData', data)
				commit('setAuthentication', true)
				return false
			} catch (error) {
				return error
			}
		},
		async loadUser() {
			const response = await this._vm.$api.autch
				.getUser(localStorage.getItem('access_token'))
				.catch(() => {})
			console.log(response)
		},
	},
}
