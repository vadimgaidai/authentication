import React, { useState } from 'react'

import Form from '../../containers/form'

import classes from './auth.module.scss'

const Auth = () => {
	const [state, setState] = useState({
		isLoading: false,
		isSignUp: false,
		formData: {
			name: '',
			email: '',
			password: '',
		},
	})

	const { isLoading, isSignUp } = state
	return (
		<section className={classes.auth}>
			<div className={classes.wrapper}>
				<h1 className={classes.caption}>Caption</h1>
				<p className={classes.description}>description</p>
			</div>
			<div className={classes.wrapper}>
				<Form
					title={isSignUp ? 'Sign Up' : 'Sign In'}
					buttonValue={isSignUp ? 'Create new account' : 'Login to account'}
					typeButton="primary"
					isLoading={isLoading}
				>
					<input type="text" />
				</Form>
			</div>
		</section>
	)
}

export default Auth
