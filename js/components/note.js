import { Component } from '../simpleflux/index.js'
import { globalStore } from '../index.js'
import { generateId } from '../utils.js'

export class Note extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
    this.state = {
      id: generateId(),
      minWidth: globalStore.getState().gridSize * 16,
      minHeight: globalStore.getState().gridSize * 4,
    }
    const handleSize = globalStore.getState().gridSize / 3
    const cornerHandleSize = handleSize * 2
    const handlePosition = handleSize * -1
    this.css = NoteCSS(this, handlePosition, handleSize, cornerHandleSize)
  }
  
  createHandleElements(namesArray) {
    const handleElements = namesArray.map((handleName) => {
      const el = document.createElement('div')
      el.classList.add('handle', `${handleName}-hndl`)
      return el
    })
    return handleElements;
  }
  
  mount() {
    const container = document.createElement('div')
    const noteContainerHandles = this.createHandleElements(['top-left', 'right', 'bottom-right', 'bottom'])
    const note = document.createElement('div')
    
    container.classList.add('note-container')
    container.id = this.state.id
    
    note.contentEditable = true
    note.classList.add('note')
    
    noteContainerHandles.forEach(handle => container.prepend(handle))
    container.prepend(note)
    
    this.element = container
    this.injectCSS()
    return this.element
  }
  
  render() {
    console.log(this.state)
    return this.element
  }
}

const NoteCSS = (context, handlePosition, handleSize, cornerHandleSize) => `
  #${context.state.id} {
    position: absolute;
    overflow: visible;
    min-width: ${context.state.minWidth}px;
    min-height: ${context.state.minHeight}px;
    width: ${context.state.minWidth}px;
    height: ${context.state.minHeight}px;
  }
  #${context.state.id} .handle {
    position: absolute;
  }

  #${context.state.id} .top-left-hndl, #${context.state.id} .bottom-right-hndl {
    width: ${cornerHandleSize}px;
    height: ${cornerHandleSize}px;
  }

  #${context.state.id} .top-left-hndl {
    top: ${handlePosition}px;
    left: ${handlePosition}px;
    cursor: move;
  }
  
  #${context.state.id} .bottom-right-hndl {
    right: ${handlePosition}px;
    bottom: ${handlePosition}px;
    cursor: nwse-resize;
  }

  #${context.state.id} .right-hndl {
    top: 0;
    right: ${handlePosition}px;
    width: ${handleSize}px;
    height: 100%;
    cursor: ew-resize;
  }

  #${context.state.id} .bottom-hndl {
    bottom: ${handlePosition}px;
    height: ${handleSize}px;
    width: 100%;
    cursor: ns-resize;
  }

  .note {
    font-size: 16px;
    line-height: 1.5;
    padding: 18px;
    background-color: white;
    overflow-y: scroll;
    border-radius: 3px;
    outline: 2px solid white;
    height: 100%;
  }

  .note.selected {
    outline: 2.5px solid #7085FD;
  }

  #${context.state.id} .note::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  #${context.state.id} .note::-webkit-scrollbar-thumb {
    background: #E1E6E7;
    border-radius: 8px;
  }
`
