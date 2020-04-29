import Vue from 'vue'
import auth from './auth'

export default ({ load, send, store }) => {
	const api = {}
	const modules = {
		auth,
	}
	Object.entries(modules).forEach(([key, value]) => {
		api[key] = value({
			load,
			send,
			store,
		})
	})
	Vue.prototype.$api = api
}
