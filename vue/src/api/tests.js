export default ({ load }) => ({
	GetTests() {
		return load(process.env.VUE_APP_API)
	},
})
