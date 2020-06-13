import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
	label,
	text,
	contaier,
	input,
	inputError,
	error,
} from './input.module.scss'

const Input = ({
	preloader,
	type,
	label: labelValue,
	value,
	rules,
	onInput,
}) => {
	// eslint-disable-next-line no-unused-vars
	const [{ error: errorValue }, setState] = useState({
		error: null,
		isPasswordVisible: false,
		inputType: null,
		isReset: false,
	})

	return (
		<label className={label}>
			<p className={text}>{labelValue}</p>
			<div className={contaier}>
				<input
					className={[input, errorValue ? inputError : null].join(' ')}
					type={type}
					placeholder={preloader}
					defaultValue={value}
					onInput={({ target }) => onInput(target.value)}
				/>
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
