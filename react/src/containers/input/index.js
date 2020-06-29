/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import FormContext from '../../context/formContext'

import Eye from '../../icons/Eye'
import EyeHide from '../../icons/EyeHide'

import {
	label,
	text,
	contaier,
	input,
	inputError,
	error,
	button,
	buttonDisabled,
	icon,
} from './input.module.scss'

const Input = ({
	preloader,
	type,
	label: labelValue,
	value,
	rules,
	onInput,
}) => {
	const [
		{ error: errorValue, isPasswordVisible, inputType, isReset },
		setState,
	] = useState({
		error: null,
		isPasswordVisible: false,
		inputType: null,
		isReset: false,
	})

	const [isDidMount, setDidMount] = useState(false)

	useEffect(() => setDidMount(true), [])

	const context = useContext(FormContext)

	const { pathname } = useLocation()

	const checkIsValid = (isError) => {
		return rules.some((func) => {
			const message = func(value)
			if (isError) {
				setState((prevState) => ({
					...prevState,
					error: message,
				}))
			}
			return message
		})
	}

	const setValidation = (isError) => {
		context(!checkIsValid(isError), type)
	}

	useEffect(() => {
		setValidation(false)
	}, [type])

	useEffect(() => {
		if (isDidMount) {
			setValidation(!isReset)
		}
	}, [value])

	const setVisiblePassword = (event) => {
		event.preventDefault()
		setState((prevState) => ({
			...prevState,
			isPasswordVisible: !isPasswordVisible,
			inputType: isPasswordVisible ? 'password' : 'text',
		}))
	}

	return (
		<label className={label}>
			<p className={text}>{labelValue}</p>
			<div className={contaier}>
				<input
					className={[input, errorValue ? inputError : null].join(' ')}
					type={inputType || type}
					placeholder={preloader}
					defaultValue={value}
					onInput={({ target: { value: inputValue } }) => onInput(inputValue)}
					onBlur={() => setValidation(true)}
				/>
				{type === 'password' ? (
					<button
						className={[button, !value ? buttonDisabled : null].join(' ')}
						disabled={!value}
						onClick={setVisiblePassword}
					>
						{isPasswordVisible ? (
							<EyeHide className={icon} />
						) : (
							<Eye className={icon} />
						)}
					</button>
				) : null}
			</div>
			{errorValue ? <span className={error}> {errorValue}</span> : null}
		</label>
	)
}

Input.propTypes = {
	preloader: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	rules: PropTypes.array,
	onInput: PropTypes.func,
}

Input.defaultProps = {
	value: '',
	rules: [],
}

export default Input
