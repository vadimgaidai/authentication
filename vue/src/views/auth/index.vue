<template>
	<section :class="$style.auth">
		<div :class="$style.wrapper">
			<h1 :class="$style.caprion">{{ captionAuth }}</h1>
			<p :class="$style.description">
				{{ descriptionAuth }}
			</p>
		</div>
		<div :class="$style.wrapper">
			<VForm
				:title="isSignUp ? 'Sign Up' : 'Sign In'"
				:button-value="isSignUp ? 'Create new account' : 'Login to account'"
				type-button="primary"
				@submit="sendDataForm"
			>
				<template #form-content>
					<VInput
						v-if="isSignUp"
						v-model="formData.name"
						:rules="formRules.name"
						type="text"
						label="Name"
						preloader="Enter you name"
					/>
					<VInput
						v-model="formData.email"
						:rules="formRules.email"
						type="email"
						label="Email"
						preloader="Enter you email"
					/>
					<VInput
						v-model="formData.password"
						:rules="formRules.password"
						type="password"
						label="Password"
						preloader="Enter you password"
					/>
				</template>
			</VForm>
			<p :class="$style.route">
				{{ isSignUp ? 'Dont have an account?' : 'Already have an account?' }}
				<router-link
					:to="isSignUp ? 'signin' : 'signup'"
					:class="$style.routeLink"
					>{{ isSignUp ? 'Sign In' : 'Sign Up' }}</router-link
				>
			</p>
		</div>
	</section>
</template>
<script>
import { required, length, name, email, password } from '@/utils/validation'
import VForm from '@/components/v-form'
import VInput from '@/components/v-input'

export default {
	name: 'Auth',
	components: {
		VForm,
		VInput,
	},
	data() {
		return {
			isVisible: false,
			isSignUp: false,
			isValid: false,
			formData: {
				name: '',
				email: '',
				password: '',
			},
			formRules: {
				name: [required(), length(3), name()],
				email: [required(), email()],
				password: [required(), length(8, 64), password()],
			},
		}
	},
	computed: {
		captionAuth() {
			return this.isSignUp
				? 'Create your account!'
				: 'Login in into your account'
		},
		descriptionAuth() {
			return this.isSignUp
				? 'Complete all the following. Just one step'
				: 'Welcome back! Please enter you access info'
		},
	},
	watch: {
		'$route.path': {
			deep: true,
			handler() {
				this.checkAuthType()
			},
		},
	},
	mounted() {
		this.checkAuthType()
	},
	methods: {
		checkAuthType() {
			this.$route.name === 'signup'
				? (this.isSignUp = true)
				: (this.isSignUp = false)
		},
		sendDataForm() {
			console.log('sendDataForm')
		},
	},
}
</script>
<style lang="scss" module>
@import './auth.scss';
</style>
