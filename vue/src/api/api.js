import Vue from 'vue'
import autch from './autch'

export default ({ load, send, store }) => {
	const api = {}
	const modules = {
		autch,
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
