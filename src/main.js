import Vue from 'vue'
import App from './App.vue'
import router from './router'
import hansan from 'hansan-vui'
import 'hansan-vui/lib/hansan-vui.css'
import http from './http'
import elementui from 'element-ui';
import '@/assets/reset.css'
import eventBus from './event.js'


Vue.use(hansan)
Vue.use(elementui)
Vue.prototype.$axios = http
Vue.prototype.$bus = eventBus
http.defaults.baseURL = ''

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
