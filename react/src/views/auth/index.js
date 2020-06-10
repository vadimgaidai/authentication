import React, { useState } from 'react'

import Form from '../../containers/form'
import Input from '../../containers/input'

import { auth, wrapper, caption, description } from './auth.module.scss'

const Auth = () => {
	// eslint-disable-next-line no-unused-vars
	const [{ isLoading, isSignUp }, setState] = useState({
		isLoading: false,
		isSignUp: false,
		formData: {
			name: '',
			email: '',
			password: '',
		},
	})

	return (
		<section className={auth}>
			<div className={wrapper}>
				<h1 className={caption}>
					{isSignUp ? 'Create your account!' : 'Login in into your account'}
				</h1>
				<p className={description}>
					{isSignUp
						? 'Complete all the following. Just one step'
						: 'Welcome back! Please enter you access info'}
				</p>
			</div>
			<div className={wrapper}>
				<Form
					title={isSignUp ? 'Sign Up' : 'Sign In'}
					buttonValue={isSignUp ? 'Create new account' : 'Login to account'}
					typeButton="primary"
					isLoading={isLoading}
				>
					{isSignUp ? (
						<Input type="text" label="Name" preloader="Enter you name" />
					) : null}
					<Input type="email" label="Email" preloader="Enter you email" />
					<Input
						type="password"
						label="Password"
						preloader="Enter you password"
					/>
				</Form>
			</div>
		</section>
	)
}

export default Auth
