import Vue from 'vue';

import '@/utils/flexible';
import App from '@/app';
import router from '@/router';
import store from '@/store';
import Icon from '@/components/icon';
import '@/assets/styles/index.styl';
import '@/utils/console';

Vue.config.productionTip = false;
Vue.use(Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

if (module.hot) {
  module.hot.accept();
}
