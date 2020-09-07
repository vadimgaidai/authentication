import React from 'react'
import PropTypes from 'prop-types'

import classes from './button.module.scss'

const { button, disabled } = classes

const Button = ({ children, typeButton, disabled: isDisabled, onClick }) => {
	const onClickHandler = (event) => onClick(event)

	return (
		<button
			className={[
				button,
				classes[typeButton],
				disabled ? isDisabled : null,
			].join(' ')}
			onClick={onClickHandler}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	typeButton: PropTypes.string,
	onClick: PropTypes.func,
}

Button.defaultProps = {
	typeButton: 'default',
	onClick: () => {},
}

export default Button
