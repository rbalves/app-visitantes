import Vue from 'vue'

import VueMask from 'v-mask'
Vue.use(VueMask);

import App from './App.vue'

export const eventBus = new Vue();

new Vue({
  render: h => h(App)
}).$mount('#app')
