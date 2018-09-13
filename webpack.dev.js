const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development',
	entry: './src/suneditor_build',
	output: {
		filename: 'suneditor.js',
		path: path.resolve(__dirname, 'dist')
	},

	devtool: 'cheap-module-eval-source-map',

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/suneditor.css'
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: ['/node_modules']
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(jpg|gif|png|ico)$/,
				use: [{
					loader: "url-loader",
					options: {
						publicPath: '../',
						name: 'img/[hash].[ext]',
						limit: 10000
					}
				}]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: "file-loader",
					options: {
						publicPath: '../',
						name: 'fonts/[hash].[ext]',
						limit: 5000,
						mimetype: 'application/font-woff'
					}
				}]
			}
		]
	},
	
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
