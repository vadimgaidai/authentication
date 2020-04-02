const path = require('path')

module.exports = {
	devServer: {
		proxy: process.env.VUE_APP_API,
	},
	pwa: {
		name: 'Authentication',
	},
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			title: 'Authentication',
		},
	},
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
	},
}

function addStyleResource(rule) {
	rule
		.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [path.resolve(__dirname, './src/assets/styl/style.styl')],
		})
}
