export default ({ request }) => ({
	sendSignUp(name, email, password) {
		return request({
			url: `${process.env.VUE_APP_API}signUp?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				displayName: name,
				email,
				password,
				returnSecureToken: true,
			},
			method: 'POST',
		})
	},
	sendSignIn(email, password) {
		return request({
			url: `${process.env.VUE_APP_API}signInWithPassword?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				email,
				password,
				returnSecureToken: true,
			},
			method: 'POST',
		})
	},
	getUser(idToken) {
		return request({
			url: `${process.env.VUE_APP_API}lookup?key=${process.env.VUE_APP_API_KEY}`,
			data: { idToken },
			method: 'POST',
		})
	},
	refreshToken(token) {
		return request({
			url: `${process.env.VUE_APP_TOKEN_RESET}/v1/token?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				grant_type: 'refresh_token',
				refresh_token: token,
			},
			method: 'POST',
		})
	},
})
