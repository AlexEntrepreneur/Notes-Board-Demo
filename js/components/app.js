import { Component, renderDOM } from '../simpleflux/index.js'
import { globalDispatcher, globalStore } from '../index.js'
import Grid from './Grid/Grid.js'

export default class App extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
  }
  
  scrollWindowOnLoad(e) {
    const coords = {
      x: (e.target.documentElement.scrollWidth / 2) - (window.innerWidth / 2),
      y: (e.target.documentElement.scrollHeight / 2) - (window.innerHeight / 2)
    }

    window.scrollBy(coords.x, coords.y)
  }
  
  mount() {
    renderDOM(Grid, this.element)
    window.addEventListener("DOMContentLoaded", this.scrollWindowOnLoad)
    return this
  }
  

  render() {
    return this.element
  }
}