export const load = async url => {
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
	})
	return response.ok
		? {
				data: await response.json(),
				request: {
					status: response.status,
					url: response.url,
					method: 'GET',
				},
		  }
		: Promise.reject(response)
}

export const send = async (url, data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response.ok
		? {
				data: await response.json(),
				request: {
					status: response.status,
					url: response.url,
					method: 'POST',
				},
		  }
		: Promise.reject(response)
}
