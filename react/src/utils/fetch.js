import merge from 'lodash/merge'
import store from '../redux/store'
import { updateTokens } from '../redux/auth/action'

const optionsDefault = {
	'Content-Type': 'application/json',
}

const JWT = async () => {
	const expiredIn = localStorage.getItem('expires_in')
	const accessToken = localStorage.getItem('access_token')
	const isExpired = !expiredIn || expiredIn < Date.now() / 1000
	if (isExpired) {
		await store.dispatch(updateTokens())
		return localStorage.getItem('access_token')
	}
	return accessToken
}

export const request = async ({
	url,
	data,
	method = 'GET',
	options,
	jwt = false,
}) => {
	const response = await fetch(url, {
		method,
		body: JSON.stringify(data),
		headers: jwt
			? merge(
					{ Authorization: `Bearer ${await JWT()}` },
					options ?? optionsDefault
			  )
			: options ?? optionsDefault,
	})
	return response?.ok
		? {
				data: await response.json(),
				request: response,
		  }
		: Promise.reject(response)
}
