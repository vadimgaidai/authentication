const validationTypes = {
	required: () => {
		return value => {
			if (!value) {
				return 'Обязательное поле'
			}
			return false
		}
	},
	name: () => {
		return value => {
			const isValid = /^([A-Za-z]*)$/.test(value)
			if (!isValid) {
				return 'Введите корректное имя'
			}
			return false
		}
	},
	password: () => {
		return value => {
			const isValid = /^([A-Za-z0-9@#$%^&+=]*)$/.test(value)
			if (!isValid) {
				return 'Введите корректный пароль'
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
				return 'Введите корректный адрес электронный почты'
			}
			return false
		}
	},
	length: (minLength, maxLength) => {
		return value => {
			if (value.length < minLength) {
				return `Минимальное количество символов: ${minLength}`
			}
			if (value.length > maxLength) {
				return `Максимальное количество символов: ${maxLength}`
			}
			return false
		}
	},
}

export default validationTypes
