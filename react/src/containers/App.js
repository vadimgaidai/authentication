import React, { useEffect } from 'react'
import ScrollToTop from 'react-router-scroll-top'
import { Route, Switch, withRouter } from 'react-router-dom'

import Index from '../views/index'

// eslint-disable-next-line react/prop-types
const App = ({ hideLoader }) => {
	useEffect(hideLoader, [])
	return (
		<ScrollToTop>
			<Switch>
				<Route path="/" component={Index} exact />
			</Switch>
		</ScrollToTop>
	)
}

export default withRouter(App)
