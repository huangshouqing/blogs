import Vue from 'vue'
import App from './App.vue'
import router from './router'
import hansan from 'hansan-vui'
import 'hansan-vui/lib/hansan-vui.css'
import http from './http'
import '@/assets/reset.css'
import eventBus from './event.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)
Vue.use(hansan)
Vue.prototype.$axios = http
Vue.prototype.$bus = eventBus
http.defaults.baseURL = ''

Vue.config.productionTip = false
window.document.title = '江湖'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
