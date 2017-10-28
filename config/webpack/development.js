const {resolve} = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./common/base')
require('dotenv').config()

const {ROOT_DIR, SOURCE_FOLDER, COMMON_CONFIGS, LOADERS_FOLDER} = require('./common/_conts')
const Package = require(resolve(ROOT_DIR, 'package'))

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
    new HtmlWebpackPlugin({
      title: Package.title,
      cache: true,
      showErrors: true,
      template: resolve(COMMON_CONFIGS, 'index.html'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'inline-source-map',
  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './dev.js',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: SOURCE_FOLDER,
        options: {
          cache: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {loader: 'style-loader', options: {sourceMap: true}},
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'resolve-url-loader', options: {sourceMap: true}},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {path: resolve(LOADERS_FOLDER, 'postcss.config.js')},
            },
          },
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      {
        test: /\.(scss2|css2)$/,
        use: [
          {loader: 'style-loader', options: {sourceMap: true}},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: true,
            },
          },
          {loader: 'resolve-url-loader', options: {sourceMap: true}},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {path: resolve(LOADERS_FOLDER, 'postcss.config.js')},
            },
          },
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
    ],
  },
  devServer: {
    // contentBase: SOURCE_FOLDER,
    compress: true,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
})
