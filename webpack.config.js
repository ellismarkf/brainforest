var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	entry: {
		app: [
			'webpack-hot-middleware/client?reload=true',
			'./index.js'
		]
	},
	devtool: 'eval-source-map',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				 test: /\.js$/
				,loader: 'babel-loader'
				,exclude: /node_modules/
			}
		,
			{
			     test: /\.css$/
			    ,loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			}
		,
			{
			     test: /\.less$/
			    ,loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			    ,exclude: /node_modules/
			}
		,
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
		]	
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Mark &amp; Lisy's Wedding",
			template: 'index-html.ejs',
			inject: 'body'
		}),
		new ExtractTextPlugin("style.css"),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		  	'process.env.NODE_ENV': JSON.stringify('development'),
		  	__DEVELOPMENT___: true,
		  	__DEVTOOLS__: true
		})
	]
}