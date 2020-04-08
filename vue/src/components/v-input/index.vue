<template>
	<label :class="$style.label">
		<p :class="$style.text">{{ label }}</p>
		<input
			:class="$style.input"
			:type="type"
			:placeholder="preloader"
			@input="$emit('input', $event.target.value)"
			@blur="validateHandler($event.target.value)"
		/>
		<p v-show="error" :class="$style.error">{{ error }}</p>
	</label>
</template>
<script>
import validation from '@/utils/validation'

export default {
	name: 'VInput',
	props: {
		preloader: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			typeValidation: null,
			error: null,
		}
	},
	methods: {
		validateHandler(value) {
			this.error = null
			const isValidation = this.rules.every(rule => {
				let isValue = true
				if (typeof rule === 'string') {
					this.typeValidation = validation[rule]()
				} else if (typeof rule === 'object') {
					this.typeValidation = validation[rule.type](rule.value)
				}

				isValue = this.typeValidation.handler(value)

				if (!isValue) {
					this.error = this.typeValidation.message
				}

				return isValue
			})

			return isValidation
		},
	},
}
</script>
<style lang="scss" module>
@import './v-input.scss';
</style>
