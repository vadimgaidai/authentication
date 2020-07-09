import {
	SET_DATA,
	SET_USER,
	SET_AUTH,
	RESET_STATE,
	SET_SIGN_UP,
} from '../actionTypes'

export const setAuthentication = (isAuth) => {
	return {
		type: SET_AUTH,
		isAuth,
	}
}

export const resetLocalStorage = () => {
	localStorage.clear()
}

export const resetState = () => {
	return {
		type: RESET_STATE,
	}
}

export const setIsSignUp = (isSignUp) => {
	return {
		type: SET_SIGN_UP,
		isSignUp,
	}
}

export const setUser = (user) => {
	return {
		type: SET_USER,
		user,
	}
}

export const loadUser = () => {
	return async (dispatch) => {
		try {
			const {
				data: { users },
			} = await window.$api.auth.getUser(localStorage.getItem('access_token'))
			const { displayName: name, email, localId } = users.find((user) => user)
			dispatch(setUser({ name, email, localId }))
			dispatch(setAuthentication(true))
		} catch ({ status }) {
			// dispatch('notificationServerError', status, { root: true })
		}
	}
}

export const updateTokens = () => {
	return async (dispatch) => {
		try {
			const {
				data: {
					access_token: accessToken,
					refresh_token: refreshToken,
					expires_in: expiresIn,
				},
			} = await window.$api.auth.refreshToken(
				localStorage.getItem('refresh_token')
			)

			localStorage.setItem('access_token', accessToken)
			localStorage.setItem('refresh_token', refreshToken)
			localStorage.setItem('expires_in', Date.now() / 1000 + expiresIn)
			await dispatch(loadUser())
		} catch {
			dispatch(resetLocalStorage())
			dispatch(resetState())
		}
	}
}

export const initial = () => {
	return async (dispatch) => {
		try {
			if (!localStorage.getItem('refresh_token')) {
				return
			}
			await dispatch(updateTokens())
		} catch {}
	}
}

export const setData = (data) => {
	return {
		type: SET_DATA,
		data,
	}
}

export const onSignIn = ({ email, password }) => {
	return async (dispatch) => {
		try {
			const { data } = await window.$api.auth.sendSignIn(email, password)
			dispatch(setData(data))
		} catch {}
	}
}

export const onSignUp = ({ name, email, password }) => {
	return async () => {
		try {
			await window.$api.auth.sendSignUp(name, email, password)
			return false
		} catch (error) {
			return error
		}
	}
}

export const logoutHandler = () => {
	return (dispatch) => {
		dispatch(setAuthentication(false))
		dispatch(resetLocalStorage())
		dispatch(resetState())
	}
}
