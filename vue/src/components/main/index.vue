<template>
	<main class="main">
		<slot />
	</main>
</template>

<script>
export default {
	data() {
		return {}
	},
}
</script>

<style lang="stylus">
@import 'main.styl';
@import './main-tablet.styl';
@import './main-mobile.styl';
</style>
