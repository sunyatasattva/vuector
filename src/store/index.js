import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as getters from './getters'
import Toolbar from './modules/Toolbar'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = { 
    isAddingObject: false, 
    canvas: {
      objects: []
    },
    meta: { 
      activeObjectId: null 
    }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    Toolbar
  },
  strict: false,
  plugins: debug ? [createLogger()] : []
})