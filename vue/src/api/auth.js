export default ({ send }) => ({
	sendSignUp(name, email, password) {
		return send({
			url: `${process.env.VUE_APP_API}signUp?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				displayName: name,
				email,
				password,
				returnSecureToken: true,
			},
		})
	},
	sendSignIn(email, password) {
		return send({
			url: `${process.env.VUE_APP_API}signInWithPassword?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				email,
				password,
				returnSecureToken: true,
			},
		})
	},
	getUser(idToken) {
		return send({
			url: `${process.env.VUE_APP_API}lookup?key=${process.env.VUE_APP_API_KEY}`,
			data: { idToken },
		})
	},
	refreshToken(token) {
		return send({
			url: `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`,
			data: {
				grant_type: 'refresh_token',
				refresh_token: token,
			},
		})
	},
})
