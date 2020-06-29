<template>
	<label :class="$style.label">
		<p :class="$style.text">{{ label }}</p>
		<div :class="$style.contaier">
			<input
				ref="input"
				:class="[$style.input, { [$style.inputError]: error }]"
				:type="inputType || type"
				:placeholder="preloader"
				:value="value"
				@blur="setValidation(true)"
				@input="$emit('input', $event.target.value)"
			/>
			<button
				v-if="type === 'password'"
				:class="[$style.button, { [$style.buttonDisabled]: !value }]"
				:disabled="!value"
				@click.stop.prevent="setVisiblePassword"
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
			isReset: false,
		}
	},
	watch: {
		value() {
			console.log(this.value)

			this.setValidation(!this.isReset)
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
		this.$bus.$on('check-valid', () => {
			this.checkIsValid(true)
		})
		this.$bus.$on('reset-data', () => {
			this.isReset = true
			this.$emit('input', '')
			this.$nextTick(() => {
				this.isReset = false
			})
		})
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
			this.checkValidInput(!this.checkIsValid(isError), this.type)
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
