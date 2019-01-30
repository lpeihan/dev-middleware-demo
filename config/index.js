module.exports = {
  dev: {
    port: 8301,
    autoOpenBrowser: true,
    map: false,
    proxy: {
      '/api': {
        target: 'http://47.98.144.117:3000/',
        pathRewrite: { '^/api': '/' }
      }
    }
  },

  build: {
    gzip: false
  },

  dir: {
    src: 'src',
    server: 'server',
    public: 'public',
    dist: 'dist'
  }
};
