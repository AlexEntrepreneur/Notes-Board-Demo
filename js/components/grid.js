import { Component } from '../simpleflux/index.js'
import { globalStore } from '../index.js'
import { parseSVG } from '../utils.js'

export class Grid extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
    this.state = {
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
    const quarterDotSize = dotSize / 4
    const container = document.createElement('div')
    const el = parseSVG(`
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot_grid" width="${gridUnit}" height="${gridUnit}" patternUnits="userSpaceOnUse">
          <rect width="${gridUnit}" height="${gridUnit}" fill="${this.state.backgroundColor}" />
          <circle cx="${quarterDotSize}" cy="${quarterDotSize}" r="${dotSize}" fill="${this.state.gridDotColor}" />
          <circle cx="${gridUnit}" cy="${quarterDotSize}" r="${dotSize}" fill="${this.state.gridDotColor}" />
          <circle cx="${quarterDotSize}" cy="${gridUnit}" r="${dotSize}" fill="${this.state.gridDotColor}" />
          <circle cx="${gridUnit}" cy="${gridUnit}" r="${dotSize}" fill="${this.state.gridDotColor}" />
          </pattern>
          </defs>
        <rect width="100%" height="100%" fill="url(#dot_grid)" />
      </svg>
    `)
    
    container.classList.add('notes-grid')
    container.appendChild(el)
    
    this.element = container
    return this.element
  }
}