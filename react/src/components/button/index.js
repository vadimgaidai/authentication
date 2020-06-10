import React from 'react'
import PropTypes from 'prop-types'

import classes from './button.module.scss'

const { button, disabled } = classes

const Button = ({ children, typeButton, disabled: isDisabled }) => {
	return (
		<button
			className={[
				button,
				classes[typeButton],
				disabled ? isDisabled : null,
			].join(' ')}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	typeButton: PropTypes.string,
}

Button.defaultProps = {
	typeButton: 'default',
}

export default Button
