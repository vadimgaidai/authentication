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
				dispatch(
					'notification',
					{
						type: 'success',
						title: 'Registration completed successfully',
						text: 'Now you can log in to your account',
					},
					{ root: true }
				)
				return false
			} catch (error) {
				const { status } = error
				if (status === 400) {
					dispatch(
						'notification',
						{
							type: 'error',
							title: 'An account with this email address already exists',
							text: 'Please check the correctness of the entered data',
						},
						{ root: true }
					)
				} else {
					dispatch('notificationServerError', status, { root: true })
				}
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
				const { status } = error
				if (status === 400) {
					dispatch(
						'notification',
						{
							type: 'error',
							title: 'Invalid email or password',
							text: 'Please check the correctness of the entered data',
						},
						{ root: true }
					)
				} else {
					dispatch('notificationServerError', status, { root: true })
				}
				return error
			}
		},
		async loadUser({ commit, dispatch }) {
			try {
				const {
					data: { users },
				} = await this._vm.$api.auth.getUser(
					localStorage.getItem('access_token')
				)
				const { displayName: name, email, localId } = users.find(user => user)
				commit('setUser', { name, email, localId })
				commit('setAuthentication', true)
			} catch ({ status }) {
				dispatch('notificationServerError', status, { root: true })
			}
		},
		logoutHandler({ commit, dispatch }) {
			commit('setAuthentication', false)
			commit('resetState', null, { root: true })
			dispatch('resetLocalStorage', null, { root: true })
		},
	},
}
