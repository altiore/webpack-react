const { resolve } = require('path')
const Dotenv = require('dotenv-webpack')

const { ROOT_DIR, SOURCE_FOLDER, OUTPUT_FOLDER, PUBLIC_PATH, STATIC_FOLDER, COMMON_CONFIGS } = require('./_conts')
const Package = require(resolve(ROOT_DIR, 'package'))

module.exports = {
  name: Package.name,
  context: SOURCE_FOLDER,
  target: 'web',
  output: {
    path: OUTPUT_FOLDER,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: PUBLIC_PATH,
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.md'],
    alias: {
      root: ROOT_DIR,
      static: STATIC_FOLDER,
      components: resolve(SOURCE_FOLDER, 'components'),
      styles: resolve(SOURCE_FOLDER, 'styles'),
      store: resolve(SOURCE_FOLDER, 'store'),
      helpers: resolve(SOURCE_FOLDER, 'helpers'),
      pages: resolve(SOURCE_FOLDER, 'pages'),
      data: resolve(SOURCE_FOLDER, 'data'),
    },
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          extends: resolve(COMMON_CONFIGS, '.babelrc'),
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              digest: 'hex',
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'static/fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
