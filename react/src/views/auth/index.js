import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import Form from '../../containers/form'
import Input from '../../containers/input'
import { onSignIn, onSignUp, setIsSignUp } from '../../redux/auth/action'

import { required, length, name, email, password } from '../../utils/validation'

import {
	auth,
	wrapper,
	caption,
	description,
	route,
	routeLink,
} from './auth.module.scss'

const Auth = () => {
	const { isSignUp = false } = useSelector(({ authReducer }) => authReducer)

	const [{ formData, formRules }, setState] = useState({
		formData: {
			name: '',
			email: '',
			password: '',
		},
		formRules: {
			name: [required(), length(3), name()],
			email: [required(), email()],
			password: [required(), length(8, 64), password()],
		},
	})
	const [isLoading, setLoading] = useState(false)

	const dispatch = useDispatch()
	const history = useHistory()
	const { pathname } = useLocation()
	const [isDidMount, setDidMount] = useState(false)

	useEffect(() => setDidMount(true), [])

	useEffect(() => {
		dispatch(setIsSignUp(pathname.split('/')[1] === 'signup'))
	}, [dispatch, pathname])

	const setFormData = ({ type, value }) => {
		setState((prevState) => ({
			...prevState,
			formData: { ...formData, [type]: value },
		}))
	}

	const onSubmit = async () => {
		setLoading(true)
		const error = await dispatch(
			isSignUp ? onSignUp(formData) : onSignIn(formData)
		)
		setLoading(false)
		if (!error) {
			isSignUp ? window.$bus.emit('reset-data', true) : history.push('/')
		}
	}

	const formContent = () => {
		return (
			<>
				{isSignUp && (
					<Input
						type="text"
						label="Name"
						value={formData.name}
						rules={formRules.name}
						preloader="Enter you name"
						onInput={(value) => setFormData({ type: 'name', value })}
					/>
				)}
				<Input
					type="email"
					label="Email"
					value={formData.email}
					rules={formRules.email}
					preloader="Enter you email"
					onInput={(value) => setFormData({ type: 'email', value })}
				/>
				<Input
					type="password"
					label="Password"
					value={formData.password}
					rules={formRules.password}
					preloader="Enter you password"
					onInput={(value) => setFormData({ type: 'password', value })}
				/>
			</>
		)
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
					onSubmit={onSubmit}
				>
					{isDidMount && formContent()}
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
