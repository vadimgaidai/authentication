import validationTypes from './validationTypes'

const validation = (rules, value) => {
	let isError = null
	const isResult = rules.find(rule => {
		let isValidationType = null

		if (typeof rule === 'string') {
			isValidationType = validationTypes[rule]()
		} else if (typeof rule === 'object') {
			isValidationType = validationTypes[rule.type](...rule.value)
		}

		if (isValidationType(value)) {
			isError = isValidationType(value)
		}

		return isValidationType(value)
	})

	return { result: !isResult, message: isError }
}

export default validation
