/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	useRef,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

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
	const { $bus } = window
	const { isSignUp = false } = useSelector(({ authReducer }) => authReducer)

	const [
		{ error: errorValue, isPasswordVisible, inputType },
		setState,
	] = useState({
		error: null,
		isPasswordVisible: false,
		inputType: null,
	})

	const inputRef = useRef(null)

	const [isReset, setReset] = useState(false)
	const [isDidMount, setDidMount] = useState(false)

	useEffect(() => setDidMount(true), [])

	const context = useContext(FormContext)

	const checkIsValid = useCallback(
		(isError) => {
			return rules.some((cb) => {
				const message = cb(value)
				if (isError && !isReset) {
					setState((prevState) => ({
						...prevState,
						error: message,
					}))
				}
				return message
			})
		},
		[rules, value]
	)

	const setValidation = useCallback(
		(isError) => {
			context(!checkIsValid(isError), type)
		},
		[checkIsValid, context, type]
	)

	useEffect(() => {
		setValidation(false)
	}, [isSignUp])

	useEffect(() => {
		if (isDidMount) {
			setValidation(!isReset)
		}
		$bus.on('reset-data', (isResetEvent) => {
			isResetEvent ? setReset(true) : setReset(false)
		})
		return () => $bus.remove('reset-data')
	}, [])

	useEffect(() => {
		$bus.on('check-valid', (event) => {
			setValidation(event)
		})
		return () => $bus.remove('check-valid')
	}, [value])

	useEffect(() => {
		if (isReset) {
			onInput('')
			inputRef.current.value = ''
		}
	}, [isReset])

	const setVisiblePassword = (event) => {
		event.preventDefault()
		setState((prevState) => ({
			...prevState,
			isPasswordVisible: !isPasswordVisible,
			inputType: isPasswordVisible ? 'password' : 'text',
		}))
	}

	const onInputHandler = ({ target: { value: inputValue } }) => {
		onInput({ type: labelValue.toLowerCase(), inputValue })
	}

	const onBlurHandler = () => setValidation(true)

	return (
		<label className={label}>
			<p className={text}>{labelValue}</p>
			<div className={contaier}>
				<input
					className={[input, errorValue ? inputError : null].join(' ')}
					type={inputType || type}
					placeholder={preloader}
					defaultValue={value}
					onInput={onInputHandler}
					onBlur={onBlurHandler}
					ref={inputRef}
				/>
				{type === 'password' && (
					<button
						className={[button, !value && buttonDisabled].join(' ')}
						disabled={!value}
						onClick={setVisiblePassword}
					>
						{isPasswordVisible ? (
							<EyeHide className={icon} />
						) : (
							<Eye className={icon} />
						)}
					</button>
				)}
			</div>
			{errorValue && <span className={error}> {errorValue}</span>}
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
