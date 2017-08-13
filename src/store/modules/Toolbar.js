import * as types from '../mutation-types'

// initial state
const state = {
  selectedTool: {
    options: {
      fill: null,
      opacity: null
    },
    propsData: {
      type: 'pointer'
    }
  }
}

const getters = {
  selectedTool: state => {
    let tool = state.selectedTool;
    
    return Object.assign(
      {
        options: tool.options
      },
      tool.propsData
    );
  }
}

const mutations = {
  [types.SELECT_TOOL] (state, { $options, options }) {
    let propsData = $options.propsData;
    
    state.selectedTool = { options, propsData };
  }
}

export default {
  state,
  getters,
  mutations
}