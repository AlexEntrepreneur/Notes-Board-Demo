import { Store, Dispatcher, render } from './simpleflux/index.js'
import { App } from './components/app.js'

const initialAppState = { count: 1 }
export const globalStore = new Store(initialAppState)
export const globalDispatcher = new Dispatcher().register(globalStore)

render(App, document.getElementById('root'))