<template>
	<label :class="$style.label">
		<p :class="$style.text">{{ label }}</p>
		<div :class="$style.contaier">
			<input
				:class="[$style.input, { [$style.inputError]: error }]"
				:type="inputType || type"
				:placeholder="preloader"
				@blur="validateHandler($event.target.value)"
				@input="
					$emit('input', $event.target.value),
						validateHandler($event.target.value)
				"
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
			error: null,
			isPasswordVisible: false,
			inputType: null,
		}
	},
	mounted() {
		// const { type, result } = validation(this.rules, this.value)
		// this.vForm.checkValidInput(type, result)
	},
	methods: {
		validateHandler(value) {
			const { type, result, message } = validation(this.rules, value)
			this.error = message
			this.vForm.checkValidInput(type, result)
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
