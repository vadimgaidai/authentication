import React, { useEffect } from 'react'
import ScrollToTop from 'react-router-scroll-top'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Auth from '../views/auth'
import Index from '../views/index'

const App = ({ hideLoader }) => {
	useEffect(hideLoader, [])
	const { isAuth = false } = useSelector(({ authReducer }) => authReducer)
	console.log(isAuth)
	return (
		<ScrollToTop>
			<Switch>
				<Route exact path="/">
					{isAuth ? <Index /> : <Redirect to="/auth" />}
				</Route>
				<Route path="/auth" component={Auth} />
			</Switch>
		</ScrollToTop>
	)
}

App.propTypes = {
	hideLoader: PropTypes.func,
}

export default withRouter(App)
