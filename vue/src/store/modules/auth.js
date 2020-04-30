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
		setData({ commit }, userInfo = {}) {
			const {
				displayName: name,
				email,
				localId,
				idToken,
				refreshToken,
				expiresIn,
			} = userInfo

			commit('setAccessToken', idToken, { root: true })
			commit('setRefreshToken', refreshToken, { root: true })
			commit('setExpiresIn', expiresIn, { root: true })
			commit('setUser', { name, email, localId })
		},
		async signUpHandler({ dispatch }, { name, email, password }) {
			try {
				await this._vm.$api.auth.sendSignUp(name, email, password)
				return false
			} catch (error) {
				return error
			}
		},
		async signInHandler({ commit, dispatch }, { email, password }) {
			try {
				const { data } = await this._vm.$api.auth.sendSignIn(email, password)
				dispatch('setData', data)
				commit('setAuthentication', true)
				return false
			} catch (error) {
				return error
			}
		},
		async loadUser({ commit }) {
			try {
				const { data } = await this._vm.$api.auth.getUser(
					localStorage.getItem('access_token')
				)
				const { displayName: name, email, localId } = data?.users.find(
					user => user
				)

				commit('setUser', { name, email, localId })
				commit('setAuthentication', true)
			} catch {}
		},
		logoutHandler({ commit, dispatch }) {
			commit('setAuthentication', false)
			commit('resetState', null, { root: true })
			dispatch('resetLocalStorage', null, { root: true })
		},
	},
}
