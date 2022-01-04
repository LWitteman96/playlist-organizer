// module.exports = {
//   lintOnSave: process.env.NODE_ENV !== 'production'
// }

module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000/",
		changeOrigin: true,
		secure:false,
		pathRewrite: {'^/api': '/'},
		// logLevel: 'debug' 
		},
	}
	}
}