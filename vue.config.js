module.exports = {
  //publicPath: "/miaomiao",
  devServer: {
    proxy: {
	  "/users": {
		target: "http://localhost:3000",
		changeOrigin: true
	  },
	  "api/admin": {
	  		target: "http://localhost:3000",
	  		changeOrigin: true
	  },
      "/ajax": {
        target: "https://m.maoyan.com",
        changeOrigin: true
      },
      "/dianying": {
        target: "https://m.maoyan.com",
        changeOrigin: true
      },
      "/api": {
        target: "http://api.map.baidu.com",
        changeOrigin: true
      }
    }
  }
};
