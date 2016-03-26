module.exports = {
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	loaders: [
		{ test: /\.js$/, loaders: ['babel'] }
	],

}