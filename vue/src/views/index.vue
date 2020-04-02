<template>
	<Main>
		<img alt="Vue logo" src="@/assets/images/logo.png" />
		<h1>Welcome to Your Vue.js App</h1>
	</Main>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/main/'

export default {
	name: 'Index',
	components: {
		Main,
	},
	data() {
		return {}
	},
}
</script>

<style lang="stylus"></style>
