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
})
