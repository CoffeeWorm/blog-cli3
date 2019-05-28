import Vue from 'vue';
import App from './app';
import router from './router/router';
import store from './store/store';
import cache from './cache';
import timeFormat from './util/time-format';
import './reset.less';
import 'normalize.css';

Vue.config.productionTip = false;
Vue.$cache = cache;
Vue.filter('time', timeFormat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
