import Vue from 'vue'
import VueAxios from './plugins/axios'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios);

(async () => {
  if (!store.state.userChecked) {
    await store.dispatch('auth/getCurrentUser')
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
