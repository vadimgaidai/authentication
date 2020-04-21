<template>
	<label :class="$style.label">
		<p :class="$style.text">{{ label }}</p>
		<div :class="$style.contaier">
			<input
				:class="[$style.input, { [$style.inputError]: error }]"
				:type="inputType || type"
				:placeholder="preloader"
				@input="$emit('input', $event.target.value)"
			/>
			<button
				v-if="type === 'password'"
				:class="$style.button"
				@click="setVisiblePassword"
			>
				<icon
					:class="$style.icon"
					:name="isPasswordVisible ? 'eye-hide' : 'eye'"
					width="22"
					height="22"
				/>
			</button>
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
			required: true,
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},
	inject: {
		checkValidInput: {
			default: () => this.checkValidInput(),
		},
	},
	data() {
		return {
			error: null,
			isPasswordVisible: false,
			inputType: null,
			isValid: false,
		}
	},
	watch: {
		value() {
			this.setValidation(true)
		},
		'$route.path': {
			deep: true,
			handler() {
				this.setValidation(false)
			},
		},
	},
	mounted() {
		this.setValidation(false)
	},
	methods: {
		checkIsValid(isError) {
			return this.rules.some(func => {
				const error = func(this.value)
				if (isError) {
					this.error = error
				}
				return error
			})
		},
		setValidation(isError) {
			this.isValid = this.checkIsValid(isError)
			this.checkValidInput(!this.isValid, this.type)
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
