<template>
	<form :class="$style.form" @submit="sendDataForm">
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
	},
	data() {
		return {
			isDisabledButton: false,
		}
	},
	methods: {
		sendDataForm(event) {
			event.preventDefault()
			this.$emit('submit:v-form')
		},
	},
}
</script>
<style lang="scss" module>
@import './v-form.scss';
</style>
