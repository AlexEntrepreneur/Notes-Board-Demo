import { Component } from '../simpleflux/index.js'
import { globalDispatcher, globalStore } from '../index.js'


export class App extends Component {
  constructor() {
    super()
    this.subscribe(globalStore)
  }
  
  mount() {
    return this.element
  }
  

  render() {
    return this.element
  }
}