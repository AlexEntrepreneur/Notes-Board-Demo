import { globalDispatcher, globalStore } from '../../index.js'
import { deltaToElementCoords, snapCoordsToGrid, generateId, addMinWidthHeightToCoords } from '../../utils.js'
import { createNote } from '../../actions/actions.js'

export default function drawNote() {
  const gridUnit = globalStore.getState().gridUnit
  const toggleGridDraggable = this.toggleDraggable.bind(this)

  this.element.style.cursor = 'crosshair'
  toggleGridDraggable()
  
  this.element.addEventListener('mousedown', function handleMouseDown(e) {
    e.preventDefault()
    const startPosition = { x: e.clientX, y: e.clientY }
    window.addEventListener('mouseup', draw(this, handleMouseDown, startPosition, toggleGridDraggable))
  })
  
  function draw(gridElement, handleMouseDown, startPosition, toggleGridDraggable) {
    return function handleMouseUp(e) {
      const scrollCoords = { x: window.scrollX, y: window.scrollY }
      const coords = addMinWidthHeightToCoords(snapCoordsToGrid(deltaToElementCoords(startPosition.x + scrollCoords.x, startPosition.y + scrollCoords.y, e.clientX + scrollCoords.x, e.clientY + scrollCoords.y), gridUnit), gridUnit)
      
      globalDispatcher.dispatch(createNote({ id: generateId(), ...coords, text: '' }))
     
      gridElement.style.cursor = 'grab'
      toggleGridDraggable()
      gridElement.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }
}