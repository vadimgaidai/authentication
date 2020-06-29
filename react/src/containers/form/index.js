import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Button from '../../components/button'

import { FormProvider } from '../../context/formContext'

import { form, title } from './form.module.scss'

const Form = ({
	title: itleValue,
	children,
	typeButton,
	buttonValue,
	onSubmit,
}) => {
	const [validations, setValidations] = useState({})
	const [isValid, setIsValid] = useState(false)

	useHistory().listen(() => setValidations({}))

	const checkValidInput = (isValidInput, type) => {
		setValidations((prevState) => ({ ...prevState, [type]: isValidInput }))
	}

	useEffect(() => {
		setIsValid(Object.values(validations).every((valid) => valid))
	}, [validations])

	const onSubmitHandler = () => {
		if (isValid) {
			console.log('valid')
		}
	}

	return (
		<form
			className={form}
			onSubmit={(event) => {
				event.preventDefault()
				onSubmitHandler()
			}}
		>
			<FormProvider value={checkValidInput}>
				<h2 className={title}>{itleValue}</h2>
				{children}
				<Button typeButton={typeButton}>{buttonValue}</Button>
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
