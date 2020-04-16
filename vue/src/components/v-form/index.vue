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
			default: '',
		},
		typeButton: {
			type: String,
			required: true,
			default: '',
		},
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
		checkValidInput(isValid, type) {
			this.$set(this.isValid, type, isValid)
			const isError = Object.values(this.isValid).find(valid => valid === false)
			typeof isError !== 'undefined'
				? (this.isDisabledButton = true)
				: (this.isDisabledButton = false)
		},
	},
}
</script>
<style lang="scss" module>
@import './v-form.scss';
</style>
