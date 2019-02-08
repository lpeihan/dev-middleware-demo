module.exports = {
  dev: {
    port: 8301,
    autoOpenBrowser: true, // 是否自动打开浏览器
    sourceMap: false, // 是否生成 source-map
    proxy: {
      '/api': {
        target: 'http://47.98.144.117:3000/',
        pathRewrite: { '^/api': '/' }
      }
    }
  },

  build: {
    gzip: false // 是否开启 gzip
  },

  dir: {
    src: 'src',
    server: 'server',
    public: 'public',
    dist: 'dist'
  }
};
