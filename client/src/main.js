import Vue from 'vue'
import VueAxios from './plugins/axios'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios)

Vue.filter('hours', (value) => {
  return +(value / 3600).toFixed(1)
})

Vue.filter('round', (value, decimal = 2) => {
  return value.toFixed(decimal)
});

(async () => {
  await store.dispatch('auth/getCurrentUser')

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
