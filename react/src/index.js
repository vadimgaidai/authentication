import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { initial } from './redux/auth/action'
import eventBus from './utils/eventBus'

import App from './containers/App'

import api from './api/api'
import { request } from './utils/fetch'

import * as serviceWorker from './serviceWorker'

import './assets/style/index.scss'

const loader = document.querySelector('.preloader')

const showLoader = () => loader.classList.remove('preloader--hide')

const hideLoader = () => loader.classList.add('preloader--hide')

const entry = document.getElementById('root')

if (entry) {
	entry.classList.add('app')
}

api({ request, store })

window.$bus = eventBus

store.dispatch(initial()).then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App hideLoader={hideLoader} showLoader={showLoader} />
			</BrowserRouter>
		</Provider>,
		entry
	)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()
