import Vue from 'vue'
import auth from './auth'

export default ({ request, store }) => {
	const api = {}
	const modules = {
		auth,
	}
	Object.entries(modules).forEach(([key, value]) => {
		api[key] = value({
			request,
			store,
		})
	})
	Vue.prototype.$api = api
}
