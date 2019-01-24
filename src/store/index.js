import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,

  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
});
