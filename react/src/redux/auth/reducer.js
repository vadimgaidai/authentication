import cloneDeep from 'lodash/cloneDeep'
import { SET_DATA, SET_USER, SET_AUTH, RESET_STATE } from '../actionTypes'

const initialState = {
	isAuth: false,
	user: null,
}

const duplicateState = cloneDeep(initialState)

export const authReducer = (
	state = initialState,
	{ type, isAuth, data, user }
) => {
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
		case SET_USER: {
			return {
				...state,
				user,
			}
		}
		case RESET_STATE: {
			return {
				state: { ...duplicateState },
			}
		}
		default:
			return state
	}
}
