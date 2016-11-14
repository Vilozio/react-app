var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // Turns debugging on
    devtool: 'eval',
    devServer: { hot: true },
    entry: ['./src/index.jsx'],
    output: {
        path: __dirname + '/target',
        filename: './bundle.js'
    },
    module: {
        loaders: [
          {
            // RegEx for filename
            test: /\.css$/,
            // array of used loaders
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
          },
          {
            test: /\.jsx$/,
            loader: 'babel'
          }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};