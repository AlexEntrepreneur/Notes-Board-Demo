import { Component } from '../../simpleflux/index.js'
import { globalStore } from '../../index.js'


export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minWidth: globalStore.getState().gridUnit * 16,
      minHeight: globalStore.getState().gridUnit * 4,
    }
    const handleSize = globalStore.getState().gridUnit / 3
    const cornerHandleSize = handleSize * 2
    const handlePosition = handleSize * -1
    this.injectStaticCSS(NoteCSS(this, handlePosition, handleSize, cornerHandleSize))
  }
  
  createHandleElements(handles) {
    return handles.map((handleName) => {
      const el = document.createElement('div')
      el.classList.add('handle', `${handleName}-hndl`)
      return el
    })
  }
  
  mount() {
    const container = document.createElement('div')
    const note = document.createElement('div')
    const noteContainerHandles = this.createHandleElements(['top-left', 'right', 'bottom-right', 'bottom'])
    
    container.classList.add('note-container')
    container.style.top = `${this.props.originY}px`
    container.style.left = `${this.props.originX}px`
    container.style.width = `${this.props.width}px`
    container.style.height = `${this.props.height}px`
    
    note.contentEditable = true
    note.classList.add('note')
    note.textContent = this.props.text
    
    noteContainerHandles.forEach(handle => container.appendChild(handle))
    container.appendChild(note)
    
    this.element = container
    return this
  }
}

const NoteCSS = (context, handlePosition, handleSize, cornerHandleSize) => `
  .note-container {
    min-width: ${context.state.minWidth}px;
    min-height: ${context.state.minHeight}px;
    position: absolute;
    overflow: visible;
  }
  
  .handle {
    position: absolute;
  }

  .top-left-hndl, .bottom-right-hndl {
    width: ${cornerHandleSize}px;
    height: ${cornerHandleSize}px;
  }

  .top-left-hndl {
    top: ${handlePosition}px;
    left: ${handlePosition}px;
    cursor: move;
  }
  
  .bottom-right-hndl {
    right: ${handlePosition}px;
    bottom: ${handlePosition}px;
    cursor: nwse-resize;
  }

  .right-hndl {
    top: 0;
    right: ${handlePosition}px;
    width: ${handleSize}px;
    height: 100%;
    cursor: ew-resize;
  }

  .bottom-hndl {
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

  .note::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .note::-webkit-scrollbar-thumb {
    background: #E1E6E7;
    border-radius: 8px;
  }
`
