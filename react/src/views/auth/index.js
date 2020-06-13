import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import set from 'lodash/set'

import Form from '../../containers/form'
import Input from '../../containers/input'
import { onSignIn, onSignUp } from '../../redux/auth/action'

import { auth, wrapper, caption, description } from './auth.module.scss'

const Auth = () => {
	const [{ isLoading, isSignUp, formData }, setState] = useState({
		isLoading: false,
		isSignUp: false,
		formData: {
			name: '',
			email: '',
			password: '',
		},
	})
	const dispatch = useDispatch()

	const onInputHandler = ({ type, value }) => {
		const oldFormData = { ...formData }
		set(oldFormData, type, value)
		setState((prevState) => ({
			...prevState,
			formData: oldFormData,
		}))
	}

	const onSubmitHandler = () => {
		isSignUp ? dispatch(onSignUp(formData)) : dispatch(onSignIn(formData))
	}

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
					onSubmit={onSubmitHandler}
				>
					{isSignUp ? (
						<Input
							type="text"
							label="Name"
							preloader="Enter you name"
							onInput={(value) => onInputHandler({ type: 'name', value })}
						/>
					) : null}
					<Input
						type="email"
						label="Email"
						preloader="Enter you email"
						onInput={(value) => onInputHandler({ type: 'email', value })}
					/>
					<Input
						type="password"
						label="Password"
						preloader="Enter you password"
						onInput={(value) => onInputHandler({ type: 'password', value })}
					/>
				</Form>
			</div>
		</section>
	)
}

export default Auth
