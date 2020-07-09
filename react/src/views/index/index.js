import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Logo from '../../icons/Logo'
import Button from '../../components/button'
import { logoutHandler } from '../../redux/auth/action'
import { main, image, title, description } from './index.module.scss'

const Index = () => {
	const {
		user: { name },
	} = useSelector(({ authReducer }) => authReducer)
	const dispatch = useDispatch()
	const history = useHistory()

	const onLogout = () => {
		dispatch(logoutHandler())
		history.push('/signin')
	}

	return (
		<main className={main}>
			<Logo className={image} />
			<h1 className={title}>Hello, {name ?? null}!</h1>
			<p className={description}>Welcome to Your React.js App</p>
			<Button onClick={onLogout}>
				<span> Logout </span>
			</Button>
		</main>
	)
}

export default Index
