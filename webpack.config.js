const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    // Turns debugging on
    devtool: 'eval',
    devServer: { hot: true },
    entry: ['./src/index.jsx'],
    output: {
        path: __dirname + '/dist',
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
        new webpack.HotModuleReplacementPlugin(),
        devFlagPlugin
    ]
};