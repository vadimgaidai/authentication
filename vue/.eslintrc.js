module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [['@', './src']],
				extensions: ['.js', '.vue', '.json'],
			},
		},
	},
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:vue/essential',
		'plugin:vue/recommended',
		'@vue/prettier',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		parser: 'babel-eslint',
	},
	plugins: ['vue', 'prettier'],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
				bracketSpacing: true,
				printWidth: 100,
				proseWrap: 'never',
			},
		],
		'vue/arrow-spacing': [
			'error',
			{
				before: true,
				after: true,
			},
		],
		'no-unused-expressions': [
			'error',
			{
				allowShortCircuit: false,
				allowTernary: true,
				allowTaggedTemplates: false,
			},
		],
		'no-use-before-define': [
			'error',
			{
				functions: false,
			},
		],
		'vue/component-tags-order': [
			'error',
			{
				order: ['template', 'script', 'style'],
			},
		],
		'vue/valid-v-bind-sync': 'error',
		'vue/valid-v-slot': 'error',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-underscore-dangle': 'off',
		'no-alert': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
}
