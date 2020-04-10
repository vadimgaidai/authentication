const validationTypes = {
	required: () => {
		return value => {
			if (!value) {
				return 'Required field'
			}
			return false
		}
	},
	name: () => {
		return value => {
			const isValid = /^([A-Za-z]*)$/.test(value)
			if (!isValid) {
				return 'Name can only contain letters'
			}
			return false
		}
	},
	password: () => {
		return value => {
			const isValid = /^([A-Za-z0-9@#$%^&+=]*)$/.test(value)
			if (!isValid) {
				return 'Enter a valid password'
			}
			return false
		}
	},
	email: () => {
		return value => {
			const isValid = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
				value
			)
			if (!isValid) {
				return 'Enter a valid email address'
			}
			return false
		}
	},
	length: (minLength, maxLength) => {
		return value => {
			if (value.length < minLength) {
				return `Minimum number of characters: ${minLength}`
			}
			if (value.length > maxLength) {
				return `Maximum number of characters: ${maxLength}`
			}
			return false
		}
	},
}

export default validationTypes
