export const required = () => (value) => {
	if (!value) {
		return 'Required field'
	}
	return false
}

export const name = () => (value) => {
	const isValid = /^([A-Za-z]*)$/.test(value)
	if (!isValid) {
		return 'Name can only contain letters'
	}
	return false
}

export const password = () => (value) => {
	const isValid = /^([A-Za-z0-9@#$%^&+=]*)$/.test(value)
	if (!isValid) {
		return 'Enter a valid password'
	}
	return false
}

export const email = () => (value) => {
	const isValid = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
		value
	)
	if (!isValid) {
		return 'Enter a valid email address'
	}
	return false
}

export const length = (minLength, maxLength) => (value) => {
	if (value.length < minLength) {
		return `Minimum number of characters: ${minLength}`
	}
	if (value.length > maxLength) {
		return `Maximum number of characters: ${maxLength}`
	}
	return false
}
