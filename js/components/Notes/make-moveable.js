import { updateNote } from '../../actions/actions.js'
import { globalDispatcher, globalStore } from '../../index.js'
import { snapCoordsToGrid } from '../../utils.js'

export default function makeMoveable() {
  const noteComponent = this
  const noteElement = this.element
  const handle = noteElement.querySelector(`.top-left-hndl`)
  const newPosition = { originX: this.props.originX, originY: this.props.originY }
  
  const handleMouseMove = ({ x: startX, y: startY }) => function f(e) {
    const dx = e.clientX + window.scrollX - startX
    const dy = e.clientY + window.scrollY - startY
    
    newPosition.originX = startX + dx
    newPosition.originY = startY + dy
    noteElement.style.top = `${newPosition.originY}px`
    noteElement.style.left = `${newPosition.originX}px`
  }
  const handleMouseDown = e => {
    e.preventDefault()
    const startPosition = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY }
    const handleMouseMoveWithStartPosition = handleMouseMove(startPosition)
    document.documentElement.addEventListener('mousemove', handleMouseMoveWithStartPosition)
    document.documentElement.addEventListener('mouseup', handleMouseUp(handleMouseMoveWithStartPosition))
  }
  
  const handleMouseUp = (handleMouseMoveWithStartPosition) => function handleMouseUp() {
    const gridUnit = globalStore.getState().gridUnit
    const movedNote = snapCoordsToGrid({ ...noteComponent.props, ...newPosition }, gridUnit)
    const newNotes = globalStore.getState().notes.map(note => note.id === noteComponent.props.id ? movedNote : note)
    
    globalDispatcher.dispatch(updateNote(newNotes))
    
    document.documentElement.removeEventListener('mouseup', handleMouseUp)
    document.documentElement.removeEventListener('mousemove', handleMouseMoveWithStartPosition)
  };
  
  handle.addEventListener('mousedown', handleMouseDown)

  return noteElement
}