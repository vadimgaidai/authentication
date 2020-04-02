import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
		},
		{
			path: '/test',
			name: 'test',
			component: () => import(/* webpackChunkName: "test" */ './views/test/'),
		},
	],
})
