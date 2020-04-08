<template>
	<button
		:class="[
			$style.button,
			$style[typeButton],
			{ [$style.disabled]: disabled },
		]"
		:disabled="disabled"
	>
		{{ value }}
	</button>
</template>
<script>
export default {
	name: 'VButton',
	props: {
		value: {
			type: String,
			required: true,
		},
		typeButton: {
			type: String,
			default: 'default',
		},
		disabled: Boolean,
	},
}
</script>
<style lang="scss" module>
@import './v-button.scss';
</style>
