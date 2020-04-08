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
			error: null,
		}
	},
	methods: {
		validateHandler(value) {
			this.error = null
			const { message } = validation(this.rules, value)
			this.error = message
		},
	},
}
</script>
<style lang="scss" module>
@import './v-input.scss';
</style>
