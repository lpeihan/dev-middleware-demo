'use strict';

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const webpackBaseConf = require('./webpack.base.conf');
const packageJson = require('../package.json');
const { resolve, assetsPath } = require('./utils');
const config = require('../config').build;

const webpackProdConf = merge(webpackBaseConf, {
  mode: 'production',
  output: {
    filename: assetsPath('js/[name].[chunkhash:7].js'),
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env')
    }),

    new HtmlWebpackPlugin({
      title: packageJson.name,
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash:7].css')
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false,
        discardComments: {
          removeAll: true
        },
        map: config.sourceMap
      },
      canPrint: true
    }),
    new InlineManifestWebpackPlugin('runtime')

  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: 'vendors'
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码
        parallel: true, // 开启并行压缩
        extractComments: false, // 不生成 license
        sourceMap: config.sourceMap, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            unused: true,
            drop_console: false // 过滤 console
          },
          output: {
            comments: false // 过滤注释
          }
        }
      })
    ]
  }
});

if (config.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackProdConf.plugins.push(
    new CompressionWebpackPlugin({
      cache: true,
      filename: '[path]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 0,
      minRatio: 0.8
    })
  );
}

if (process.env.npm_config_argv.includes('--report')) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  webpackProdConf.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackProdConf;
