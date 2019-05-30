const modifyVars = require('./theme');
module.exports = {
  css: {
    loaderOptions: {
      /* 注入主题色 */
      less: { modifyVars }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:60000'
      }
    }
  }
};
