import {
	SET_DATA,
	SET_USER,
	SET_AUTH,
	RESET_STATE,
	SET_SIGN_UP,
} from '../actionTypes'

import { notification, notificationServerError } from '../notification/action'

export const setAuthentication = (isAuth) => ({
	type: SET_AUTH,
	isAuth,
})

export const resetState = () => ({
	type: RESET_STATE,
})

export const setIsSignUp = (isSignUp) => ({
	type: SET_SIGN_UP,
	isSignUp,
})

export const setUser = (user) => ({
	type: SET_USER,
	user,
})

export const loadUser = () => async (dispatch) => {
	try {
		const {
			data: { users },
		} = await window.$api.auth.getUser(localStorage.getItem('access_token'))
		const { displayName: name, email, localId } = users.find((user) => user)
		dispatch(setUser({ name, email, localId }))
		dispatch(setAuthentication(true))
	} catch ({ status }) {
		dispatch(notificationServerError(status))
	}
}

export const updateTokens = () => async (dispatch) => {
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
		localStorage.clear()
		dispatch(resetState())
	}
}

export const initial = () => async (dispatch) => {
	try {
		if (!localStorage.getItem('refresh_token')) {
			return
		}
		await dispatch(updateTokens())
	} catch {}
}

export const setData = (data) => ({
	type: SET_DATA,
	data,
})

export const onSignIn = ({ email, password }) => async (dispatch) => {
	try {
		const { data } = await window.$api.auth.sendSignIn(email, password)
		dispatch(setData(data))
		return false
	} catch ({ status }) {
		if (status === 400) {
			dispatch(
				notification({
					type: 'danger',
					title: 'Invalid email or password',
					text: 'Please check the correctness of the entered data',
				})
			)
		} else {
			dispatch(notificationServerError(status))
		}
		return true
	}
}

export const onSignUp = ({ name, email, password }) => async () => {
	try {
		await window.$api.auth.sendSignUp(name, email, password)
		return false
	} catch (error) {
		return error
	}
}

export const onLogout = () => (dispatch) => {
	try {
		dispatch(setAuthentication(false))
		localStorage.clear()
		dispatch(resetState())
	} catch (error) {
		console.error(error)
	}
}
