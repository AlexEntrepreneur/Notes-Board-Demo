import { globalDispatcher, globalStore } from '../../index.js'
import { deltaToElementCoords, snapCoordsToGrid, generateId, addMinWidthHeightToCoords } from '../../utils.js'
import { createNote } from '../../actions/actions.js'

export default function drawNote() {
  const gridUnit = globalStore.getState().gridUnit
  const toggleGridDraggable = this.toggleDraggable.bind(this)

  this.element.style.cursor = 'crosshair'
  toggleGridDraggable()
  
  function handleMouseDown(e) {
    e.preventDefault()
    const startPosition = {
      x: e.clientX || e.changedTouches[0].clientX,
      y: e.clientY || e.changedTouches[0].clientY,
    }

    if (e.type === "mousedown") {
      window.addEventListener(
        'mouseup',
        draw(this, handleMouseDown, startPosition, toggleGridDraggable)
      )
    }
    if (e.type === 'touchstart') {
      window.addEventListener(
        'touchend',
        draw(this, handleMouseDown, startPosition, toggleGridDraggable)
      )  
    }
  }
  
  this.element.addEventListener('mousedown', handleMouseDown)
  this.element.addEventListener('touchstart', handleMouseDown)
  
  function draw(gridElement, handleMouseDown, startPosition, toggleGridDraggable) {
    return function handleMouseUp(e) {
      e.preventDefault()
      const endPosition = {
        x: e.clientX || e.changedTouches[0].clientX,
        y: e.clientY || e.changedTouches[0].clientY,
      }
      const scrollCoords = { x: window.scrollX, y: window.scrollY }
      const coords = addMinWidthHeightToCoords(
        snapCoordsToGrid(
          deltaToElementCoords(
            startPosition.x + scrollCoords.x,
            startPosition.y + scrollCoords.y,
            endPosition.x + scrollCoords.x,
            endPosition.y + scrollCoords.y
          ),
          gridUnit
        ),
        gridUnit
      )
      
      globalDispatcher.dispatch(createNote({ id: generateId(), ...coords, text: '' }))
     
      gridElement.style.cursor = 'grab'
      toggleGridDraggable()
      gridElement.removeEventListener('touchstart', handleMouseDown)
      window.removeEventListener('touchend', handleMouseUp)
      gridElement.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }
}