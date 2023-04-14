import { Action } from '../simpleflux/index.js'

export const toggleGridDraggable = new Action(state => {
  return {
    ...state,
    gridIsDraggable: !state.gridIsDraggable
  }
})