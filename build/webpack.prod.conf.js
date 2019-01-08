'use strict';

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConf = require('./webpack.base.conf');
const { resolve, assetsPath } = require('./utils');

module.exports = merge(webpackBaseConf, {
  mode: 'production',
  output: {
    filename: assetsPath('js/[name].[chunkhash].js'),
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${resolve('public/index.html')}`,
      inject: true
    }),

    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash].css')
    })
  ]
});
