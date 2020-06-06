import { LOAD_USER } from '../actionTypes'

export const getUser = ({ data: user }) => {
	return {
		type: LOAD_USER,
		user,
	}
}

export const loadUSer = () => {
	const { $api } = window
	return async (dispatch) => {
		try {
			const { data } = await $api.tests.GetUser()
			dispatch(getUser(data))
		} catch {}
	}
}
