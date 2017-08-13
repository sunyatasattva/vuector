import * as types from '../mutation-types'

// initial state
const state = {
  selectedTool: { type: 'pointer' }
}

const getters = {
  selectedTool: state => {
    let tool = state.selectedTool;
    
    if(!tool.$options)
      return state.selectedTool;
    
    return Object.assign(
      {
        options: tool.options
      },
      tool.$options.propsData
    );
  }
}

const mutations = {
  [types.SELECT_TOOL] (state, tool) {
    state.selectedTool = tool;
  }
}

export default {
  state,
  getters,
  mutations
}