import React from 'react'
import PropTypes from 'prop-types'
import classes from './form.module.scss'

const Form = ({ title, children }) => {
	return (
		<form className={classes.form}>
			<h2 className={classes.title}>{title}</h2>
			{children}
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
