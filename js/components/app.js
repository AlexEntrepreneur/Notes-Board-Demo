import { globalStore } from '../index.js'
import { Component, renderDOM } from '../simpleflux/index.js'
import Grid from './Grid/Grid.js'
import Notes from './Notes/Notes.js'

export default class App extends Component {
  constructor() {
    super()
  }
  
  scrollWindowOnLoad(e) {
    const coords = {
      x: (e.target.documentElement.scrollWidth / 2) - (window.innerWidth / 2),
      y: (e.target.documentElement.scrollHeight / 2) - (window.innerHeight / 2)
    }

    window.scrollBy(coords.x, coords.y)
  }
  
  mount() {
    const notesData = globalStore.getState().notes
    renderDOM([new Notes({ notes: notesData }), Grid], this.element)
    window.addEventListener("DOMContentLoaded", this.scrollWindowOnLoad)
    return this
  }
}