<template>
	<section :class="$style.auth">
		<div :class="$style.wrapper">
			<h1 :class="$style.caprion">Create, Sign & Store</h1>
			<p :class="$style.description">
				text
			</p>
		</div>
		<div :class="$style.wrapper">
			<VForm
				:title="getFormTitle"
				:button-value="getValueFormButton"
				type-button="primary"
				@submit:v-form="sendDataForm"
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
				{{ getRouteText }}
				<router-link :to="getLinkPath" :class="$style.routeLink">{{
					getLinkTitle
				}}</router-link>
			</p>
		</div>
	</section>
</template>
<script>
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
			isSignUp: false,
			formData: {
				name: '',
				email: '',
				password: '',
			},
			formRules: {
				name: ['required', { type: 'length', value: [3] }, 'name'],
				email: ['required', 'email'],
				password: ['required', { type: 'length', value: [8, 64] }, 'password'],
			},
		}
	},
	computed: {
		getFormTitle() {
			return this.isSignUp ? 'Sign Up' : 'Sign In'
		},
		getValueFormButton() {
			return this.isSignUp ? 'Create new account' : 'Login to account'
		},
		getLinkPath() {
			return this.isSignUp ? 'signin' : 'signup'
		},
		getLinkTitle() {
			return this.isSignUp ? 'Sign In' : 'Sign Up'
		},
		getRouteText() {
			return this.isSignUp
				? 'Dont have an account?'
				: 'Already have an account?'
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
