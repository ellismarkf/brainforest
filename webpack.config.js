var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	entry: {
		app: [
			'webpack-hot-middleware/client?reload=true',
			'./index.js'
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
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		  	'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
}