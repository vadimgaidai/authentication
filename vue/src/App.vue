<template>
	<div id="app">
		<router-view />
		<Preloader v-if="preloader" />
	</div>
</template>

<script>
// @ is an alias to /src
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
		this.preloader = true
	},
}
</script>
<style lang="stylus"></style>
