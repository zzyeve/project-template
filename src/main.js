import Vue from 'vue';
import App from './App';
import router from './router';

// 引入全局的组件
import "./components"
import "./utils"
import "./directives"

import "@/style/index.scss";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
