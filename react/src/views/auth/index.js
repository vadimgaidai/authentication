import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import set from 'lodash/set'

import Form from '../../containers/form'
import Input from '../../containers/input'
import { onSignIn, onSignUp } from '../../redux/auth/action'

import {
	auth,
	wrapper,
	caption,
	description,
	route,
	routeLink,
} from './auth.module.scss'

const Auth = ({ match: { url } }) => {
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

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			isSignUp: url.split('/')[1] === 'signup',
		}))
	}, [url])

	const onInputHandler = ({ type, value }) => {
		setState((prevState) => ({
			...prevState,
			formData: set({ ...formData }, type, value),
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
				<p className={route}>
					{isSignUp ? 'Dont have an account?' : 'Already have an account?'}
					<NavLink to={isSignUp ? 'signin' : 'signup'} className={routeLink}>
						{isSignUp ? 'Sign In' : 'Sign Up'}
					</NavLink>
				</p>
			</div>
		</section>
	)
}

Auth.propTypes = {
	match: PropTypes.object,
}

export default Auth
