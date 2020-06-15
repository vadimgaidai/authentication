import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/rootReducer'
import { initial } from './redux/auth/action'

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

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

api({ request, store })

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
