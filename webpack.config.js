const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackValidator = require('webpack-validator')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = env => {
    console.log(env)
    const { ifProd, ifNotProd } = getIfUtils(env)
    const config = webpackValidator({
        devtool: ifProd('source-map', 'eval'),
        devServer: {hot: true},
        entry: ['./src/index.js'],
        output: {
            path: __dirname + '/dist',
            filename: './bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        {fallbackLoader: 'style-loader', loader:'css-loader'})
                },
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['babel-loader'], exclude: /node_modules/
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
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        }
    })
    if (env.debug) {
        console.log(config)
        debugger
    }
    return config
};