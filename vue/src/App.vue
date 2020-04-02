<template>
	<div id="app">
		<Header ref="header" />
		<router-view :style="`min-height: calc(100vh - ${minHeightMainContent}px);`" />
		<Footer ref="footer" />
		<Preloader v-if="preloader" />
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/'
import Footer from '@/components/footer/'
import Preloader from '@/components/preloader/'

export default {
	components: {
		Header,
		Footer,
		Preloader,
	},
	data() {
		return {
			preloader: true,
			minHeightMainContent: 0,
		}
	},
	mounted() {
		this.setMinHeightMainContent()
		this.preloader = false
	},
	methods: {
		setMinHeightMainContent() {
			this.$nextTick(() => {
				this.minHeightMainContent =
					this.$refs.header.$el.clientHeight + this.$refs.footer.$el.clientHeight
			})
		},
	},
}
</script>
<style lang="stylus"></style>
