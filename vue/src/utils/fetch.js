export const load = async url => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			mode: 'cors',
		})
		return {
			data: await response.json(),
			request: {
				status: response.status,
				url: response.url,
				method: 'GET',
			},
		}
	} catch (error) {
		return Promise.reject(error)
	}
}

export const send = async (url, data = {}) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return {
			data: await response.json(),
			request: {
				status: response.status,
				url: response.url,
				method: 'POST',
			},
		}
	} catch (error) {
		return Promise.reject(error)
	}
}
