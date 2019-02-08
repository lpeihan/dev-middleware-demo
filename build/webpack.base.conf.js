'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpackbar = require('webpackbar');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const { resolve, cssLoader, assetsPath } = require('./utils');
const { dir } = require('../config');

module.exports = {
  context: resolve(),
  entry: {
    app: [`./${dir.src}/main.js`]
  },
  output: {
    path: resolve(dir.dist),
    filename: assetsPath('js/[name].js'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve(dir.src)
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory=true',
        include: resolve('src')
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: require('./svgo-config.json')
            }
          }
        ],
        include: [resolve(`${dir.src}/assets/icons`)]
      },
      {
        test: /\.css$/,
        use: cssLoader()
      },
      {
        test: /\.styl(us)?$/,
        use: cssLoader('stylus')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('imgs/[name].[hash:7].[ext]')
        },
        include: [resolve(`${dir.src}/assets/imgs`)]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new Webpackbar(),
    new VueLoaderPlugin(),
    new HardSourceWebpackPlugin()
  ]
};
