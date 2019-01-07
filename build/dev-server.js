'use strict';

const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const opn = require('opn');

const webpackDevConf = require('./webpack.dev.conf');
const { resolve } = require('./utils');
const {
  port,
  autoOpenBrowser,
  proxy
} = require('../config').dev;
const { dir } = require('../config');

const app = express();
const compiler = webpack(webpackDevConf);

// dev-middleware
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackDevConf.output.publicPath,
  logLevel: 'warn'
});

// hot-middleware
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr',
  reload: true,
  log: false
});

// proxy
Object.keys(proxy).forEach(key => {
  let options = proxy[key];

  if (typeof options === 'string') {
    options = { target: options };
  }

  // only show warn logLevel
  app.use(proxyMiddleware(key, Object.assign({ logLevel: 'warn' }, options)));
});

app
  .use(require('connect-history-api-fallback')({ // handle fallback for HTML5 history API
    index: '/index.html',
    rewrites: []
  }))
  .use(devMiddleware)
  .use(hotMiddleware)
  .use(express.static(resolve(dir.public)));

let _resolve;
let readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve;
});

devMiddleware.waitUntilValid(() => {
  autoOpenBrowser && opn('http://localhost:' + port);
  _resolve();
});

app.listen(port, '0.0.0.0', () => {});

module.exports = readyPromise;
