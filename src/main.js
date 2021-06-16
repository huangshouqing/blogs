import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Hansan from 'hansan-vui'
import 'hansan-vui/lib/hansan-vui.css'
import http from './http'
import eventBus from './event.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/style/element-reset.less'
import '@/assets/style/reset.css'

Vue.use(Element)
Vue.use(Hansan)
Vue.prototype.$axios = http
Vue.prototype.$bus = eventBus
http.defaults.baseURL = ''

Vue.config.productionTip = false
window.document.title = '江湖'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
