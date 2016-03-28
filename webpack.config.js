var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: [
			'./index.js',
		  	"webpack-dev-server/client?http://localhost:8080/",
		  	"webpack/hot/dev-server"
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
		]	
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Mark &amp; Lisy's Wedding",
			template: 'index-html.ejs',
			inject: 'body'
		})
	]
}