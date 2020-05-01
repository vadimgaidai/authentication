<template>
	<form :class="$style.form" @submit.prevent="eventHandler">
		<h2 :class="$style.title">{{ title }}</h2>
		<slot name="form-content" />
		<VButton
			:class="$style.button"
			:type-button="typeButton"
			:disabled="isLocaleDisabledButton || isDisabledButton"
		>
			<template #button>
				<icon v-if="isLoading" name="three-dots" width="50" height="10" />
				<span v-else> {{ buttonValue }} </span>
			</template>
		</VButton>
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
		isLoading: Boolean,
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
			isLocaleDisabledButton: false,
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
		isLoading() {
			this.isLocaleDisabledButton = this.isLoading
			if (!this.isLoading) {
				this.$bus.$emit('reset-data')
			}
		},
	},
	methods: {
		checkValidInput(isValid, type) {
			this.$set(this.validations, type, isValid)
			this.isValid = !Object.values(this.validations).some(valid => !valid)
		},
		eventHandler() {
			this.$bus.$emit('set-validation')
			if (this.isValid) {
				this.$emit('submit')
			}
		},
	},
}
</script>
<style lang="scss" module>
@import './v-form.scss';
</style>
