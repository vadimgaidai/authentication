<template>
	<label :class="$style.label">
		<p :class="$style.text">{{ label }}</p>
		<div :class="$style.contaier">
			<input
				v-model="inputValue"
				:class="[$style.input, { [$style.inputError]: error }]"
				:type="inputType || type"
				:placeholder="preloader"
				@blur="eventHandler(inputValue)"
				@input="eventHandler(inputValue)"
			/>
			<icon
				v-if="type === 'password'"
				:class="$style.icon"
				:name="isPasswordVisible ? 'eye-hide' : 'eye'"
				width="22"
				height="22"
				@click="setVisiblePassword"
			/>
		</div>
		<transition name="fade">
			<span v-if="error" :class="$style.error">{{ error }}</span>
		</transition>
	</label>
</template>
<script>
export default {
	name: 'VInput',
	props: {
		preloader: {
			type: String,
			required: true,
			default: '',
		},
		type: {
			type: String,
			required: true,
			default: '',
		},
		label: {
			type: String,
			required: true,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},
	inject: {
		vForm: {
			default: () => ({
				checkValidInput() {},
			}),
		},
	},
	data() {
		return {
			inputValue: '',
			error: null,
			isPasswordVisible: false,
			inputType: null,
			isValid: false,
		}
	},
	mounted() {
		this.setValidation(false)
	},
	methods: {
		checkIsValid(valueImput, isError) {
			return this.rules.some(func => {
				const error = func(valueImput)
				if (isError) {
					this.error = error
				}
				return error
			})
		},
		setValidation(isError) {
			this.isValid = this.checkIsValid(this.inputValue, isError)
			this.vForm.checkValidInput(!this.isValid, this.type)
		},
		eventHandler() {
			this.$emit('input', this.inputValue)
			this.setValidation(true)
		},
		setVisiblePassword() {
			this.isPasswordVisible = !this.isPasswordVisible
			this.isPasswordVisible
				? (this.inputType = 'text')
				: (this.inputType = 'password')
		},
	},
}
</script>
<style lang="scss" module>
@import './v-input.scss';
</style>
