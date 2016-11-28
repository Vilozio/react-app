const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackValidator = require('webpack-validator')
const { getIfUtils } = require('webpack-config-utils')

module.exports = env => {
  const { ifProd } = getIfUtils(env)
  const config = webpackValidator({
    devtool: ifProd('source-map', 'eval'),
    devServer: {hot: true},
    entry: ['./src/index.js'],
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
      // publicPath: __dirname + '/dist/'
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
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader?name=public/icons/[name].[ext]'
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      })
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
}
