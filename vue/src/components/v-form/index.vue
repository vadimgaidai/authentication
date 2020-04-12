<template>
	<form :class="$style.form" @submit.prevent="$emit('submit')">
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
		},
		typeButton: {
			type: String,
			required: true,
		},
		value: Boolean,
	},
	provide() {
		return {
			vForm: this,
		}
	},
	data() {
		return {
			isValid: {},
			isDisabledButton: false,
		}
	},
	methods: {
		checkValidInput(rule, isValid) {
			// console.log(rule, isValid)
			// console.log(rule)

			this.$set(this.isValid, rule, isValid)

			// this.$set(this.isValid, toString(type), isValid)

			// console.log(this.isValid)

			this.$emit('input', isValid)
		},
	},
}
</script>
<style lang="scss" module>
@import './v-form.scss';
</style>
