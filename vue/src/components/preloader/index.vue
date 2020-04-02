<template>
	<transition name="fade">
		<div class="preloader">
			<div class="preloader__bounce">
				<div class="preloader__bounce-circle"></div>
				<div class="preloader__bounce-circle"></div>
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
<style lang="stylus">
@import 'preloader.styl';
</style>
