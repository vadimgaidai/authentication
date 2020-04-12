module.exports = {
	presets: [
		[
			'@vue/app',
			{
				useBuiltIns: 'entry',
			},
		],
		['@babel/preset-env'],
	],
	plugins: ['@babel/plugin-transform-runtime'],
}
