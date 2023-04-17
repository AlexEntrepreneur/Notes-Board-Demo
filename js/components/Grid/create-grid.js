import { parseSVG } from '../../utils.js'

export default function createGrid(gridUnit, dotSize) {
  const quarterDotSize = dotSize / 4
  return parseSVG(`
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
}