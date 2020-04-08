const typesValidation = {
	required: () => ({
		handler(value) {
			return value.length
		},
		message: 'Обязательное поле',
	}),
	name: () => ({
		handler(value) {
			return /^([A-Za-z]*)$/.test(value)
		},
		message: 'Введите корректное имя',
	}),
	password: () => ({
		handler(value) {
			return /^([A-Za-z0-9@#$%^&+=]*)$/.test(value)
		},
		message: 'Введите корректный пароль',
	}),
	email: () => ({
		handler(value) {
			return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
				value
			)
		},
		message: 'Введите корректный адрес электронный почты',
	}),
	minLength: minLength => ({
		handler(value) {
			return value.length >= minLength
		},
		message: `Минимальное количество символов: ${minLength}`,
	}),
	maxLength: maxLength => ({
		handler(value) {
			return value.length <= maxLength
		},
		message: `Максимальное количество символов: ${maxLength}`,
	}),
}

export default typesValidation
