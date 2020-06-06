<template>
	<div :class="$style.main">
		<icon :class="$style.image" name="vuejs" width="150" height="150" />
		<h1 v-if="userName" :class="$style.title">Hello, {{ userName }}!</h1>
		<p :class="$style.description">Welcome to Your Vue.js App</p>
		<VButton :class="$style.button" @click="onLogoutClickHandler">
			<template #button>
				<span> Logout </span>
			</template>
		</VButton>
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
	display: grid;
	align-content: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	padding: 1.5rem;
	overflow-x: hidden;
	overflow-y: auto;
}

.image {
	margin: 0 auto 4rem;
	animation: image infinite 5s linear;
	@keyframes image {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}

.title {
	font-weight: bold;
	font-size: 5rem;
	text-align: center;

	@include media('mobile') {
		font-size: 3rem;
	}
}

.description {
	font-size: 2.3rem;
	text-align: center;
	@include media('mobile') {
		font-size: 1.5rem;
	}
}
</style>
