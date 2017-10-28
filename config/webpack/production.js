const webpack = require('webpack')
const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').UnusedFilesWebpackPlugin
const OfflinePlugin = require('offline-plugin')
const Package = require(resolve(__dirname, '..', 'package'))

const commonConfig = require(resolve(__dirname, 'base'))

const { PUBLIC_PATH } = require('./common/_conts')

module.exports = env => webpackMerge(commonConfig, {
  entry: {
    bundle: [
      'babel-polyfill',
      './index.js',
    ],
  },
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.(scss2|css2)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[hash:base64:5]',
              },
            },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new InterpolateHtmlPlugin({
      'NODE_ENV': process.env.NODE_ENV || 'development',
      'PUBLIC_URL': PUBLIC_PATH,
    }),
    new HtmlWebpackPlugin({
      title: Package.title,
      inject: true,
      template: resolve(__dirname, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      beautify: false,
      mangle: true,
      compress: {
        warnings: false,
      },
      comments: false,
      drop_console: true,
      drop_debugger: true,
      screw_ie8: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash:8].css',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      seed: {
        name: 'Full Name of Application',
        short_name: 'Short',
        description: 'Best application of world',
        lang: 'en-US',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#fff',
        background_color: '#fff',
        icons: [
          {
            src: 'img/apple-touch-icon/180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            'src': '/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
          },
          {
            'src': '/android-chrome-256x256.png',
            'sizes': '256x256',
            'type': 'image/png',
          },
          {
            'src': '/images/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png',
          },
          {
            'src': '/images/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
          },
        ],
        related_applications: [
          {
            'platform': 'web',
          },
        ],
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new UnusedFilesWebpackPlugin(),
    new OfflinePlugin({
      caches: 'all',
      publicPath: PUBLIC_PATH, // can be set to fool url like http://example.com/
      responseStrategy: 'cache-first', // or 'network-first'
      updateStrategy: 'changed', // or 'all'
      externals: ['fonts/roboto.woff'],
      relativePaths: true,
      cacheMaps: [
        {
          match: function (requestUrl) {
            return new URL('/', location)
          },
          requestTypes: ['navigate'],
        },
      ],
      autoUpdate: 1000 * 60 * 60 * 3, // (3 hours auto update)
      ServiceWorker: {
        output: 'service-worker.js',
        navigateFallbackURL: PUBLIC_PATH,
        minify: true,
        short_name: 'Mainly Toner',
      },
    }),
  ],
})