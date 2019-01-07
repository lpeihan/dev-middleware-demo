'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpackbar = require('webpackbar');

const { resolve } = require('./utils');
const { dir } = require('../config');

module.exports = {
  context: resolve(),
  entry: {
    app: [`./${dir.frontend}/main.js`]
  },
  output: {
    path: resolve(dir.dist),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve(dir.frontend)
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new Webpackbar(),
    new VueLoaderPlugin()
  ]
};
