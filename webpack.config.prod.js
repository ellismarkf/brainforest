var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: [ path.join(__dirname, 'index.js')],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
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
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			title: "Brainforest Demo",
			template: 'index-html.ejs',
			inject: 'body'
		}),
		new ExtractTextPlugin("style.css"),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
		  	'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
}