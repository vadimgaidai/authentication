import Vue from 'vue'
import { load, send } from '@/utils/fetch'
import api from './api/api'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './registerServiceWorker'
import './assets/style/style.scss'

// plugins
import './plugins/svgicon'
import eventBus from './plugins/eventBus'

Vue.prototype.$bus = eventBus
store.$bus = eventBus

api({
	load,
	send,
	store,
})

Vue.config.productionTip = false

store.dispatch('initial').then(() => {
	new Vue({
		router,
		store,
		render: h => h(App),
	}).$mount('#app')
})
