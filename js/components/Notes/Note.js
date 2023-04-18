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
    this.css = NoteCSS(this, handlePosition, handleSize, cornerHandleSize)
    this.injectCSS()
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
    container.id = this.props.id
    
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
  #${context.props.id} {
    position: absolute;
    top: ${context.props.originY}px;
    left: ${context.props.originX}px;
    overflow: visible;
    min-width: ${context.state.minWidth}px;
    min-height: ${context.state.minHeight}px;
    width: ${context.props.width}px;
    height: ${context.props.height}px;
  }
  #${context.props.id} .handle {
    position: absolute;
  }

  #${context.props.id} .top-left-hndl, #${context.props.id} .bottom-right-hndl {
    width: ${cornerHandleSize}px;
    height: ${cornerHandleSize}px;
  }

  #${context.props.id} .top-left-hndl {
    top: ${handlePosition}px;
    left: ${handlePosition}px;
    cursor: move;
  }
  
  #${context.props.id} .bottom-right-hndl {
    right: ${handlePosition}px;
    bottom: ${handlePosition}px;
    cursor: nwse-resize;
  }

  #${context.props.id} .right-hndl {
    top: 0;
    right: ${handlePosition}px;
    width: ${handleSize}px;
    height: 100%;
    cursor: ew-resize;
  }

  #${context.props.id} .bottom-hndl {
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

  #${context.props.id} .note::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  #${context.props.id} .note::-webkit-scrollbar-thumb {
    background: #E1E6E7;
    border-radius: 8px;
  }
`
