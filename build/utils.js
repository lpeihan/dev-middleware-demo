'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.isDev = process.env.NODE_ENV === 'development'; ;

exports.resolve = function resolve(dir = '') {
  return path.join(__dirname, '..', dir);
};

exports.assetsPath = function(_path) {
  return path.posix.join(_path);
};

exports.cssLoader = function(loader) {
  const loaders = [
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader'
    }
  ];

  if (loader) {
    loaders.push({
      loader: `${loader}-loader`
    });

    loader === 'stylus' && loaders.push({
      loader: 'style-resources-loader',
      options: {
        patterns: [
          exports.resolve('src/assets/styles/variables.styl'),
          exports.resolve('src/assets/styles/mixins.styl')
        ]
      }
    });
  }

  const styleLoader = exports.isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

  return [styleLoader].concat(loaders);
};
