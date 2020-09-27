import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactNotification from 'react-notifications-component'
import store from './redux/store'
import { initial } from './redux/auth/action'
import eventBus from './utils/eventBus'

import App from './containers/App'

import api from './api/api'
import { request } from './utils/fetch'
import * as serviceWorker from './serviceWorker'

import './assets/style/index.scss'
import 'react-notifications-component/dist/theme.css'

const loader = document.querySelector('.preloader')
const entry = document.getElementById('root')

if (entry) {
	entry.classList.add('app')
}

api({ request, store })
window.$bus = eventBus

const hideLoader = () => loader.classList.add('preloader--hide')

store.dispatch(initial()).then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App hideLoader={hideLoader} />
				<ReactNotification />
			</BrowserRouter>
		</Provider>,
		entry
	)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()
