module.exports = {
  dev: {
    port: 8301,
    autoOpenBrowser: true,
    proxy: {
      '/api': {
        target: 'http://47.98.144.117:3000/',
        pathRewrite: { '^/api': '/' }
      }
    }
  },

  build: {
    gzip: true
  },

  dir: {
    src: 'src',
    server: 'server',
    public: 'public',
    dist: 'dist'
  }
};
