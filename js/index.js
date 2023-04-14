import { Store, Dispatcher, renderDOM } from './simpleflux/index.js'
import App from './components/App.js'

const initialAppState = { gridUnit: 16, gridDotSize: 1.25, gridWidth: 10000, gridHeight: 6000 }
export const globalStore = new Store(initialAppState)
export const globalDispatcher = new Dispatcher().register(globalStore)

renderDOM(App, document.getElementById('root'))