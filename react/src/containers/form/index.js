import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import Button from '../../components/button'
import ThreeDots from '../../icons/ThreeDots'

import { FormProvider } from '../../context/formContext'

import { form, title, icon } from './form.module.scss'

const Form = ({
	title: tileValue,
	children,
	typeButton,
	buttonValue,
	onSubmit,
	isLoading,
}) => {
	const { pathname } = useLocation()
	const [validations, setValidations] = useState({})
	const [isValid, setIsValid] = useState(false)

	useEffect(() => {
		setValidations({})
	}, [pathname])

	const checkValidInput = (isValidInput, type) => {
		setValidations((prevState) => ({ ...prevState, [type]: isValidInput }))
	}

	useEffect(() => {
		setIsValid(Object.values(validations).every((valid) => valid))
	}, [validations])

	const onSubmitHandler = (event) => {
		event.preventDefault()
		window.$bus.emit('check-valid', true)
		if (isValid) {
			onSubmit()
		}
	}

	return (
		<form className={form} onSubmit={onSubmitHandler}>
			<FormProvider value={checkValidInput}>
				<h2 className={title}>{tileValue}</h2>
				{children}
				<Button typeButton={typeButton}>
					<SwitchTransition>
						<CSSTransition key={isLoading} classNames="fade" timeout={300}>
							<span>
								{isLoading ? <ThreeDots className={icon} /> : buttonValue}
							</span>
						</CSSTransition>
					</SwitchTransition>
				</Button>
			</FormProvider>
		</form>
	)
}

Form.propTypes = {
	title: PropTypes.string,
	buttonValue: PropTypes.string.isRequired,
	typeButton: PropTypes.string.isRequired,
	isDisabledButton: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
}

export default Form
