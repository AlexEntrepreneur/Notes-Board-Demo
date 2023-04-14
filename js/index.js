import { Store, Dispatcher, render } from './simpleflux/index.js'
import { App } from './components/app.js'

const initialAppState = { gridUnit: 16, gridDotSize: 1.25, gridWidth: 10000, gridHeight: 6000 }
export const globalStore = new Store(initialAppState)
export const globalDispatcher = new Dispatcher().register(globalStore)

render(App, document.getElementById('root'))