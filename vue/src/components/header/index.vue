<template>
	<header class="header">
		<div class="header__inner">
			<router-link v-for="link in links" :key="link.id" :to="link.to" class="header__link">{{
				link.text
			}}</router-link>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{
					id: 0,
					text: 'Index',
					to: '/',
				},
				{
					id: 1,
					text: 'Test API',
					to: '/test',
				},
			],
		}
	},
}
</script>

<style lang="stylus">
@import 'header.styl';
@import './header-tablet.styl';
@import './header-mobile.styl';
</style>
