const modifyVars = require('./theme');
module.exports = {
  css: {
    loaderOptions: {
      /* 注入主题色 */
      less: { modifyVars }
    }
  }
};
