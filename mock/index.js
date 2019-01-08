const express = require('express');
const example = require('./example');

const apiRoutes = express.Router();

apiRoutes.get('/example', (req, res) => {
  res.json({
    code: 0,
    data: example
  });
});

module.exports = apiRoutes;
