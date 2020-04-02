import Vue from 'vue'
import { load, send } from '@/utils/fetch'
import api from './api/api'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './registerServiceWorker'
import './assets/styl/style.styl'

// plugins
import './plugins/svgicon'

api({
	load,
	send,
	store,
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
