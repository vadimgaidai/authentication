import { LOAD_USER } from '../actionTypes'

const initialState = {
	isAuth: false,
	user: {},
}

export const authReducer = (state = initialState, { type, user }) => {
	switch (type) {
		case LOAD_USER: {
			return {
				...state,
				isAuth: true,
				user,
			}
		}
		default:
			return state
	}
}
