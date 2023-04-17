import { globalStore } from '../../index.js'
import { renderDOM } from '../../simpleflux/index.js'
import { deltaToElementCoords, snapCoordsToGrid } from '../../utils.js'
import Note from '../Note.js'
import { generateId } from '../../utils.js'

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
      const coords = snapCoordsToGrid(deltaToElementCoords(startPosition.x + scrollCoords.x, startPosition.y + scrollCoords.y, e.clientX + scrollCoords.x, e.clientY + scrollCoords.y), gridUnit)
      const minWidth = gridUnit * 16
      const minHeight = gridUnit * 4
      
      renderDOM(new Note({ ...coords, minWidth, minHeight, id: generateId() }), document.getElementById('root'))

      gridElement.style.cursor = 'grab'
      toggleGridDraggable()
      gridElement.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }
}