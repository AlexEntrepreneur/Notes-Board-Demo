import { Component, renderDOM } from '../../simpleflux/index.js'
import { globalStore } from '../../index.js'
import makeDraggable from './make-draggable.js'
import DrawingMenu from '../DrawingMenu.js'
import createGrid from './create-grid.js'
import drawNote from './draw-note.js';

export default class Grid extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
    this.state = {
      isDraggable: true,
      isDragging: false,
      initialMousePos: {},
      initialScrollPos: {},
      gridDotColor: '#E0E5E6',
      backgroundColor: '#F0F6F7'
    }
    this.css = `
      .notes-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: ${globalStore.getState().gridWidth}px;
        height: ${globalStore.getState().gridHeight}px;
        cursor: grab;
        z-index: -1;
      }
    `
    this.injectCSS()
  }
  
  mount() {
    const gridUnit = globalStore.getState().gridUnit
    const dotSize = globalStore.getState().gridDotSize
    const container = document.createElement('div')
    const el = createGrid.call(this, gridUnit, dotSize)
    
    container.classList.add('notes-grid')
    container.appendChild(el)
    
    this.element = container
    renderDOM(new DrawingMenu({ drawNote: drawNote.bind(this) }), this.element)
    makeDraggable.call(this, this.state.isDraggable)
  
    return this
  }
  
  toggleDraggable() {
    this.setState((state) => ({ ...state, isDraggable: !state.isDraggable }))
  }
}