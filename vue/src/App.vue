<template>
	<div id="app">
		<notifications classes="notification" position="top right" />
		<router-view />
		<Preloader v-if="preloader" />
	</div>
</template>

<script>
import Preloader from '@/components/preloader/'

export default {
	components: {
		Preloader,
	},
	data() {
		return {
			preloader: true,
		}
	},
	mounted() {
		this.preloader = false
	},
}
</script>
<style lang="scss"></style>
