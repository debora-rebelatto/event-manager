import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'
//import './element-variables.scss'

locale.use(lang)
Vue.use(ElementUI);
Vue.use(Message)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
