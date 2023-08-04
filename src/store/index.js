import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './dashboard.js';
import residentReviewed from './residentReviewed.js';
import paymentOrder from './paymentOrder';
import parkingManage from './parkingManage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
    dashboard, residentReviewed, paymentOrder, parkingManage
  }
})
