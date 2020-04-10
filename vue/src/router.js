import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			meta: { requiresAuth: true },
		},
		{
			path: '/signin',
			name: 'signin',
			component: () => import(/* webpackChunkName: "SignIn" */ './views/auth/'),
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import(/* webpackChunkName: "SignUp" */ './views/auth/'),
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		!store.state.isAuthentication
			? next({ path: '/signin' })
			: next({ path: '/' })
	} else {
		next()
	}
})

export default router
