import * as types from './mutation-types';

export const SELECT_OBJECT = (state, object) => {
  state.meta.activeObjectId = object._uid;
}

export const SYNC_CANVAS = (state, canvas) => {
  state.canvas = canvas.canvas;
  state.meta = canvas.meta;
}

export const SET_OBJECT_PROP = (state, prop, value) => {
  
}