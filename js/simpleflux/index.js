export class Store {
  constructor(initialState) {
    this.state = initialState
    this.subscribers = []
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  getState() {
    return this.state
  }

  setState(newState) {
    this.state = newState
    this.subscribers.forEach(subscriber => {
      subscriber.props = { ...subscriber.props, ...this.state }
      subscriber.render()
    })
  }
}

export class Dispatcher {
  constructor() {
    this.store = null
  }

  register(store) {
    this.store = store
    return this
  }

  dispatch(action) {
    const newState = action.execute(this.store.state)
    this.store.setState(newState)
    return this
  }
}

export class Action {
  constructor(actionFunction, payload) {
    this.actionFunction = actionFunction
    this.payload = payload
  }

  execute(oldState) {
    return this.actionFunction(oldState, this.payload)
  }
}

export class Component {
  constructor() {
    this.state = {}
    this.props = {}
    this.element = null
    this.css = ``
  }

  subscribe(store) {
    store.subscribe(this)
  }

  setState(setter) {
    const newState = setter()
    this.state = { ...this.state, ...newState }
    this.render()
  }

  injectCSS() {
    const styleElement = document.createElement('style')
    styleElement.textContent = this.css
    this.css && document.head.appendChild(styleElement)
  }

  render() {
    return this.element
  }
}

export function render(Component, rootElement) {
  rootElement.append(new Component().mount())
}