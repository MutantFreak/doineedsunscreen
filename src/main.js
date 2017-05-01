import App from './App'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
})
