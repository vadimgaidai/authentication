<template>
	<button
		:class="[
			$style.button,
			$style[typeButton],
			{ [$style.disabled]: disabled },
		]"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<slot name="button" />
	</button>
</template>
<script>
export default {
	name: 'VButton',
	props: {
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
