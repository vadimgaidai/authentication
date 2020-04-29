export default ({ send }) => ({
	sendSignUp(name, email, password) {
		return send(
			`${process.env.VUE_APP_API}signUp?key=${process.env.VUE_APP_API_KEY}`,
			{
				displayName: name,
				email,
				password,
				returnSecureToken: true,
			}
		)
	},
	sendSignIn(email, password) {
		return send(
			`${process.env.VUE_APP_API}signInWithPassword?key=${process.env.VUE_APP_API_KEY}`,
			{
				email,
				password,
				returnSecureToken: true,
			}
		)
	},
	getUser(idToken) {
		return send(
			`${process.env.VUE_APP_API}lookup?key=${process.env.VUE_APP_API_KEY}`,
			{
				idToken,
			}
		)
	},
	refreshToken(token) {
		return send(
			`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`,
			{
				grant_type: 'refresh_token',
				refresh_token: token,
			}
		)
	},
})
