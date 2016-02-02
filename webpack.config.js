var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
    'babel-polyfill',
    './index'
  ],
	output: {
		publicPath: '/',
		filename: './es5-index.js'
	},
	//	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'es6'),
				loader: 'babel-loader',
				query: {
					presets: ["es2015", "stage-0"],
				}
      },
			{
				test: /\.json$/,
				loader: "json-loader"
			}
    ]
	},
	debug: true
};
