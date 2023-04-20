import { Component, renderDOM } from '../../simpleflux/index.js'
import Note from './Note.js'

export default class Notes extends Component {
  constructor(props) {
    super(props)
  }
  
  mount() {
    this.element = document.createElement('div')
    this.element.id = 'notes-container'
    this.props.notes.forEach(note => {
      renderDOM(new Note({ id: note.id }), this.element)
    })
    return this
  }
}