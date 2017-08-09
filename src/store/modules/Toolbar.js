import * as types from '../mutation-types'

// initial state
const state = {
  selectedTool: { type: 'pointer' }
}

const getters = {
  selectedTool: state => state.selectedTool
}

const mutations = {
  [types.SELECT_TOOL] (state, tool) {
    state.selectedTool = tool._props;
  }
}

export default {
  state,
  getters,
  mutations
}