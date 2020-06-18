import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
		{ error: errorValue, isPasswordVisible, inputType },
		setState,
	] = useState({
		error: null,
		isPasswordVisible: false,
		inputType: null,
		isReset: false,
	})

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
					onInput={({ target }) => onInput(target.value)}
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
