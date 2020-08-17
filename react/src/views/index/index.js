import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Logo from '../../icons/Logo'
import Button from '../../components/button'
import { onLogout } from '../../redux/auth/action'
import { main, image, title, description } from './index.module.scss'

const Index = () => {
	const {
		user: { name },
	} = useSelector(({ authReducer }) => authReducer)
	const dispatch = useDispatch()
	const history = useHistory()

	const onLogoutHandler = async () => {
		await dispatch(onLogout())
		history.push('/signin')
	}

	return (
		<main className={main}>
			<Logo className={image} />
			<h1 className={title}>{name && `Hello, ${name}!`}</h1>
			<p className={description}>Welcome to Your React.js App</p>
			<Button onClick={onLogoutHandler}>
				<span> Logout </span>
			</Button>
		</main>
	)
}

export default Index
