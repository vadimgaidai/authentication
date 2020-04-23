<template>
	<form :class="$style.form" @submit="eventHandler">
		<h2 :class="$style.title">{{ title }}</h2>
		<slot name="form-content" />
		<VButton
			:value="buttonValue"
			:type-button="typeButton"
			:disabled="isDisabledButton"
		/>
	</form>
</template>
<script>
import VButton from '@/components/v-button'

export default {
	name: 'VForm',
	components: {
		VButton,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		buttonValue: {
			type: String,
			required: true,
			default: '',
		},
		typeButton: {
			type: String,
			required: true,
			default: '',
		},
		isDisabledButton: Boolean,
	},
	provide() {
		return {
			checkValidInput: this.checkValidInput,
		}
	},
	data() {
		return {
			validations: {},
			isValid: false,
		}
	},
	watch: {
		'$route.path': {
			deep: true,
			handler() {
				this.validations = {}
				this.isValid = false
			},
		},
	},
	methods: {
		checkValidInput(isValid, type) {
			this.$set(this.validations, type, isValid)
			this.isValid = !Object.values(this.validations).some(valid => !valid)
		},
		eventHandler(event) {
			event.preventDefault()
			this.$root.$emit('set-validation')
			if (this.isValid) {
				this.$emit('submit')
				this.$root.$emit('reset-data')
			}
		},
	},
}
</script>
<style lang="scss" module>
@import './v-form.scss';
</style>
