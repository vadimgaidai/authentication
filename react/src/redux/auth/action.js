import { SET_DATA } from '../actionTypes'

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
	return async (dispatch) => {
		try {
			await window.$api.auth.sendSignUp(name, email, password)
			return false
		} catch (error) {
			return error
		}
	}
}
