'use strict';

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConf = require('./webpack.base.conf');
const { resolve } = require('./utils');

module.exports = merge(webpackBaseConf, {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${resolve('public/index.html')}`,
      inject: true
    })
  ]
});
