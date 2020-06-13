import { SET_AUTH, SET_DATA } from '../actionTypes'

const initialState = {
	isAuth: false,
	user: null,
}

export const authReducer = (state = initialState, { type, isAuth, data }) => {
	switch (type) {
		case SET_AUTH: {
			return {
				...state,
				isAuth,
			}
		}
		case SET_DATA: {
			const {
				displayName: name,
				email,
				localId,
				idToken,
				refreshToken,
				expiresIn,
			} = data

			localStorage.setItem('access_token', idToken)
			localStorage.setItem('refresh_token', refreshToken)
			localStorage.setItem('expires_in', Date.now() / 1000 + expiresIn)

			return {
				...state,
				isAuth: true,
				user: {
					name,
					email,
					localId,
				},
			}
		}
		default:
			return state
	}
}
