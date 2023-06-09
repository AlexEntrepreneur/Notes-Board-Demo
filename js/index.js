import { Store, Dispatcher, renderDOM } from './simpleflux/index.js'
import App from './components/App.js'

const initialAppState = {
  gridUnit: 16,
  gridDotSize: 1.25,
  gridWidth: 10000,
  gridHeight: 6000,
  notes: [
    { id:'ahQKiaYhJVRc', originX:4800, originY:2736, width:400, height:352, text: 'This is a test note' },
    { id:'bOKLDLiWLbKL', originX:4800, originY:3104, width:400, height:144, text: 'This is a test note' },
  ]
}

export const globalStore = new Store(initialAppState)
export const globalDispatcher = new Dispatcher().register(globalStore)

renderDOM(App, document.getElementById('root'))