import { globalStore } from '../../index.js'
import { Component, renderDOM } from '../../simpleflux/index.js'
import Note from './Note.js'

export default class Notes extends Component {
  constructor(props) {
    super(props)
    this.subscribe(globalStore)
  }
  
  mount() {
    this.element = document.createElement('div')
    this.element.id = 'notes-container'
    this.props.notes.forEach(note => {
      renderDOM(new Note({ ...note }), this.element)
    })
    return this
  }
  
  render() {
    this.element.innerHTML = ''
    this.props.notes.forEach(note => {
      renderDOM(new Note({ ...note }), this.element)
    })
    return this.element
  }
}