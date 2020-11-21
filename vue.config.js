module.exports = {
  devServer: {
    proxy: {
      "/ajax": {
        target: "https://m.maoyan.com",
        changeOrigin: true
      },
      "/dianying": {
        target: "https://m.maoyan.com",
        changeOrigin: true
      }
    }
  }
};
