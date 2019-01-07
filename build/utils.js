'use strict';

const path = require('path');

exports.resolve = function resolve(dir = '') {
  return path.join(__dirname, '..', dir);
};
