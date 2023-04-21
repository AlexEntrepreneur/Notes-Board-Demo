import { globalStore } from '../../index.js'
import { Component, renderDOM } from '../../simpleflux/index.js'
import Note from './Note.js'

export default class Notes extends Component {
  constructor(props) {
    super(props)
    this.subscribe(globalStore)
    this.state = {
      notesCount: this.props.notes.length
    }
  }
  
  mount() {
    this.element = document.createElement('div')
    this.element.id = 'notes-container'
    this.props.notes.forEach(note => {
      renderDOM(new Note({ id: note.id }), this.element)
    })
    return this
  }
  
  render() {
    if (this.state.notesCount !== this.props.notes.length) {
      const newNote = this.props.notes[this.props.notes.length - 1]
      this.setState((state) => ({ ...state, notesCount: ++state.notesCount }))
      renderDOM(new Note({ id: newNote.id, selected: true }), this.element)
      this.element.lastChild.querySelector('.note').focus()
    }
    return this.element
  }
}