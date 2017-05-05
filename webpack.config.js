const path = require('path')
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
      path: path.join(__dirname, '/dist'),
      filename: 'static/js/bundle.js',
      publicPath: '/'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query:
          {
            'presets': ['es2015', 'react', 'stage-0']
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader?limit=10000&name=static/images/[name].[ext]'
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=static/fonts/[name].[ext]'
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new ExtractTextPlugin('style.css'),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(env.dev),
        __DEBUG__: JSON.stringify(env.debug),
        'process.env': {
          NODE_ENV: JSON.stringify(ifProd('production', 'development'))
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
