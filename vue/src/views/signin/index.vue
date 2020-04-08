<template>
	<section :class="$style.signin">
		<div :class="$style.wrapper">
			<h1 :class="$style.caprion">Create, Sign & Store</h1>
			<p :class="$style.description">
				text
			</p>
		</div>
		<div :class="$style.wrapper">
			<VForm
				title="Sign In"
				value="Sign In"
				type-button="primary"
				@submit:v-form="sendDataForm"
			>
				<template #form-content>
					<VInput
						ref="email"
						v-model="formData.email"
						:rules="formRules.email"
						type="email"
						label="Email"
						preloader="Enter you email"
					/>
					<VInput
						ref="password"
						v-model="formData.password"
						:rules="formRules.password"
						type="password"
						label="Password"
						preloader="Enter you password"
					/>
				</template>
			</VForm>
		</div>
	</section>
</template>
<script>
import VForm from '@/components/v-form'
import VInput from '@/components/v-input'

export default {
	name: 'Signin',
	components: {
		VForm,
		VInput,
	},
	data() {
		return {
			formData: {
				email: '',
				password: '',
			},
			formRules: {
				email: ['required', 'email'],
				password: ['required', { type: 'length', value: [3, 64] }, 'password'],
			},
		}
	},
	methods: {
		sendDataForm() {
			console.log('sendDataForm')
		},
	},
}
</script>
<style lang="scss" module>
@import './signin.scss';
</style>
