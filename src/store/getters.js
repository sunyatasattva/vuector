export const canvas = state => {
  return state.canvas;
}

export const objects = state => {
  return state.canvas.objects;
}

export const activeObjectId = state => {
  return state.meta.activeObjectId;
}

export const isAddingObject = state => {
  return state.isAddingObject;
}