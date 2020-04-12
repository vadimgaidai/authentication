import validationTypes from './validationTypes'

const validation = (rules, value) => {
	let isError = null
	let isRuleType = null
	rules.find(rule => {
		let isValidationType = null

		if (rule?.type) {
			isRuleType = rule.type
			isValidationType = validationTypes[rule.type](...rule.value)
		} else if (rule) {
			isRuleType = rule
			isValidationType = validationTypes[rule]()
		}

		if (isValidationType(value)) {
			isError = isValidationType(value)
		}

		return isValidationType(value)
	})

	return {
		result: !isError,
		type: isRuleType,
		message: isError,
	}
}

export default validation
