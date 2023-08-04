import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/reset.css';
import api from '@/api';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(api);



// excel表格的使用
import JsonExcel from 'vue-json-excel';
Vue.component('downloadExcel', JsonExcel);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
