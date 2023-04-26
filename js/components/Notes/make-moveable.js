import { updateNote } from '../../actions/actions.js'
import { globalDispatcher, globalStore } from '../../index.js'
import { snapCoordsToGrid } from '../../utils.js'

export default function makeMoveable() {
  const noteComponent = this
  const noteElement = this.element
  const handle = noteElement.querySelector(`.top-left-hndl`)
  const newPosition = { originX: this.state.originX, originY: this.state.originY }
  
  const handleMouseMove = ({ x: startX, y: startY }) => function f(e) {
    const dx = (e.clientX || e.changedTouches[0].clientX) + window.scrollX - startX
    const dy = (e.clientY || e.changedTouches[0].clientY) + window.scrollY - startY
    
    newPosition.originX = startX + dx
    newPosition.originY = startY + dy
    noteElement.style.top = `${newPosition.originY}px`
    noteElement.style.left = `${newPosition.originX}px`
  }

  const handleMouseDown = e => {
    e.preventDefault()
    const startPosition = {
      x: (e.clientX || e.changedTouches[0].clientX) + window.scrollX,
      y: (e.clientY || e.changedTouches[0].clientY) + window.scrollY,
    }
    const handleMouseMoveWithStartPosition = handleMouseMove(startPosition)
    document.documentElement.addEventListener('mousemove', handleMouseMoveWithStartPosition)
    document.documentElement.addEventListener('mouseup', handleMouseUp(handleMouseMoveWithStartPosition))
    document.documentElement.addEventListener('touchmove', handleMouseMoveWithStartPosition)
    document.documentElement.addEventListener('touchend', handleMouseUp(handleMouseMoveWithStartPosition))
  }
  
  const handleMouseUp = (handleMouseMoveWithStartPosition) => function handleMouseUp() {
    const gridUnit = globalStore.getState().gridUnit
    const movedNote = snapCoordsToGrid({ ...newPosition, height: noteComponent.state.height, width: noteComponent.state.width }, gridUnit)
    const newNotes = globalStore.getState().notes.map(note => note.id === noteComponent.props.id ? { ...note, ...movedNote } : note)
    
    globalDispatcher.dispatch(updateNote(newNotes))
    noteComponent.setState((state) => ({ ...state, ...movedNote }))
    
    document.documentElement.removeEventListener('mouseup', handleMouseUp)
    document.documentElement.removeEventListener('mousemove', handleMouseMoveWithStartPosition)
    document.documentElement.removeEventListener('thouchend', handleMouseUp)
    document.documentElement.removeEventListener('touchmove', handleMouseMoveWithStartPosition)
  };
  
  handle.addEventListener('mousedown', handleMouseDown)
  handle.addEventListener('touchstart', handleMouseDown)
}