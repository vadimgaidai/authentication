<template>
	<Main class="test">
		<div class="test__inner">
			<div class="test__wrap">
				<h1 class="test__caption">
					Test
					<icon class="test__icon" name="api" width="50" height="50" />
					page
				</h1>
			</div>
			<p v-for="test in tests" :key="test.id" class="test__data">
				{{ test }}
			</p>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Test',
	components: {
		Main,
	},
	computed: {
		...mapState(['tests']),
	},
	async mounted() {
		await this.loadTests()
	},
	methods: {
		...mapActions('tests', ['loadTests']),
	},
}
</script>

<style lang="stylus">
@import 'test.styl';
</style>
