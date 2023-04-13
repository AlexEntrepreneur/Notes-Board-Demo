import { Action, Component } from '../simpleflux/index.js'
import { globalDispatcher, globalStore } from '../index.js'

const incrementAction = new Action((state) => {
  return { ...state, count: ++state.count }
})

export class App extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
    this.state = { count: 1 }
    this.css = `
      button {
        color: red;
      }
    `
  }
  
  mount() {
    const el = document.createElement('button')
    el.textContent = globalStore.getState().count
    this.element = el
    this.element.onclick = this.handleClick.bind(this)
    this.injectCSS()
    return this.element
  }
  
  handleClick(e) {
    e.preventDefault()
    globalDispatcher.dispatch(incrementAction)
  }

  render() {
    this.element.textContent = this.props.count
    return this.element
  }
}