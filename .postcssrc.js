const pxtorem = require('postcss-pxtorem');

module.exports = {
  // to edit target browsers: use "browserslist" field in package.json
  plugins: [
    require('autoprefixer'),
    pxtorem({
      rootValue: 37.5,
      propList: ['*']      
    })
  ]
}