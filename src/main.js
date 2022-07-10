import Vue from 'vue';
import AppComponent from './Application';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(AppComponent)
}).$mount('#app')
