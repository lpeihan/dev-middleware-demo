module.exports = {
  dev: {
    port: 8300,
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
    frontend: 'src',
    backend: 'lib',
    public: 'public',
    dist: 'dist'
  }
};
