
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime', {
        corejs: 2,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ],
    require('@babel/plugin-syntax-dynamic-import'),
    'transform-vue-jsx'
  ]
};