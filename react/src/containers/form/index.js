import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/button'

import { form, title } from './form.module.scss'

const onSubmitHandler = (event) => {
	event.preventDefault()
}

const Form = ({ title: itleValue, children, typeButton, buttonValue }) => {
	return (
		<form className={form} onSubmit={onSubmitHandler}>
			<h2 className={title}>{itleValue}</h2>
			{children}
			<Button typeButton={typeButton}>{buttonValue}</Button>
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
}

export default Form
