import { updateNote } from '../../actions/actions.js'
import { globalDispatcher, globalStore } from '../../index.js'
import { snapCoordsToGrid } from '../../utils.js'

export default function makeResizeable() {
  const noteComponent = this
  const noteElement = this.element
  const newDimensions = { width: this.state.width, height: this.state.height }
  let gridElement = null
  
  const handleMouseMove = (handleName, startPosition, startDimensions) => (e) => {
    const dx = (e.clientX || e.changedTouches[0].clientX) - startPosition.x
    const dy = (e.clientY || e.changedTouches[0].clientY) - startPosition.y
    const belowMinWidth = parseInt(noteElement.style.width) < noteComponent.state.minWidth
    const belowMinHeight = parseInt(noteElement.style.height) < noteComponent.state.minHeight
    const newWidth = belowMinWidth ? noteComponent.state.minWidth : startDimensions.width + dx
    const newHeight = belowMinHeight ? noteComponent.state.minHeight : startDimensions.height + dy
    
    switch (handleName) {
      case 'right-hndl':
        newDimensions.width = newWidth
        noteElement.style.width = `${newDimensions.width}px`
        // Fix: Cursor style flashing on fast resizing
        gridElement.style.cursor = 'ew-resize'
        noteElement.style.cursor = 'ew-resize'
        break
      case 'bottom-hndl':
        newDimensions.height = newHeight
        noteElement.style.height = `${newDimensions.height}px`
        // Fix: Cursor style flashing on fast resizing
        gridElement.style.cursor = 'ns-resize'
        noteElement.style.cursor = 'ns-resize'
        break
      case 'bottom-right-hndl':
        newDimensions.width = newWidth
        newDimensions.height = newHeight
        noteElement.style.width = `${newDimensions.width}px`
        noteElement.style.height = `${newDimensions.height}px`
        // Fix: Cursor style flashing on fast resizing
        gridElement.style.cursor = 'nwse-resize'
        noteElement.style.cursor = 'nwse-resize'
        break
    }
    
  }

  const handleMouseDown = e => {
    e.preventDefault()
    const startPosition = {
      x: e.clientX || e.changedTouches[0].clientX,
      y: e.clientY || e.changedTouches[0].clientY,
    }
    const startDimensions = { width: this.state.width, height: this.state.height }
    const handleName = e.target.className.split(' ')[1]
    const handleMouseMoveWithProps = handleMouseMove(handleName, startPosition, startDimensions)
    gridElement = document.querySelector('.notes-grid')
    
    document.documentElement.addEventListener('mouseup', handleMouseUp(handleMouseMoveWithProps))
    document.documentElement.addEventListener('mousemove', handleMouseMoveWithProps)
    document.documentElement.addEventListener('touchend', handleMouseUp(handleMouseMoveWithProps))
    document.documentElement.addEventListener('touchmove', handleMouseMoveWithProps)
  }
  
  const handleMouseUp = (handleMouseMoveWithProps) => function handleMouseUp() {
    const gridUnit = globalStore.getState().gridUnit
    const resizedNote = snapCoordsToGrid({ ...newDimensions, originX: noteComponent.state.originX, originY: noteComponent.state.originY }, gridUnit)
    const newNotes = globalStore.getState().notes.map(note => note.id === noteComponent.state.id ? { ...note, ...resizedNote } : note)
    
    globalDispatcher.dispatch(updateNote(newNotes))
    noteComponent.setState((state) => ({ ...state, ...resizedNote }))
    gridElement.style.cursor = 'grab'

    document.documentElement.removeEventListener('mousemove', handleMouseMoveWithProps)
    document.documentElement.removeEventListener('mouseup', handleMouseUp)
    document.documentElement.removeEventListener('touchmove', handleMouseMoveWithProps)
    document.documentElement.removeEventListener('touchend', handleMouseUp)
  };

  for (const note of noteElement.children) {
    if (note.className.match('handle') && !note.className.match('top-left')) {
      note.addEventListener('mousedown', handleMouseDown)
      note.addEventListener('touchstart', handleMouseDown)
    }
  }
}