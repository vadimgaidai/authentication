<template>
	<div :class="$style.main">
		<img :class="$style.image" alt="Vue logo" src="@/assets/images/logo.png" />
		<h1 :class="$style.title">Hallo, {{ userName }}!</h1>
		<p :class="$style.description">Welcome to Your Vue.js App</p>
		<VButton value="Logout" @click="onLogoutClickHandler" />
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import VButton from '@/components/v-button'

export default {
	name: 'Index',
	components: {
		VButton,
	},
	computed: {
		...mapState('auth', ['user']),
		userName() {
			return this.user?.name
		},
	},
	methods: {
		...mapActions('auth', ['logoutHandler']),
		onLogoutClickHandler() {
			this.logoutHandler()
			this.$router.push('/signin')
		},
	},
}
</script>
<style lang="scss" module>
.main {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
}
</style>
