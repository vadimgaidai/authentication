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
	refreshToken() {
		return send(
			`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`,
			{
				grant_type: 'refresh_token',
				refresh_token: localStorage.getItem('refresh_token'),
			}
		)
	},
})
