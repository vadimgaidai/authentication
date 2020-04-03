<template>
	<transition name="fade">
		<div :class="$style.preloader">
			<div :class="$style.bounce">
				<div v-for="index in 2" :key="index" :class="$style.circle"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Preloader',
	data() {
		return {}
	},
}
</script>
<style lang="scss" module>
@import 'preloader.scss';
</style>
