export class Store {
  constructor(initialState) {
    this.state = initialState
    this.subscribers = []
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  getState() {
    return structuredClone(this.state)
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
    console.log('Dispatcher:', newState)
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
  constructor(props) {
    this.state = {}
    this.props = { ...props } || {}
    this.element = document.createDocumentFragment()
  }

  subscribe(store) {
    store.subscribe(this)
  }

  setState(setter) {
    const newState = setter(this.state)
    this.state = newState
    this.render()
  }

  injectStaticCSS(css) {
    let styleElement = document.getElementById('app-styles-elem')
    if (styleElement) {
      const styles = styleElement.textContent
      if (!styles.match(css)) {
        styleElement.textContent = styles + css
      }
    } else {
      styleElement = document.createElement('style')
      styleElement.id = 'app-styles-elem'
      styleElement.textContent = css
      css && document.head.appendChild(styleElement)
    }
  }

  mount() {
    return this
  }

  render() {
    return this.element
  }
}

export function renderDOM(component, rootElement) {
  function renderInstance(C) {
    rootElement.appendChild(C.mount().render())
  }
  function createInstanceAndRender(C) {
    rootElement.appendChild(new C().mount().render())
  }
  
  if (Array.isArray(component)) {
    const reversed = [ ...component ].reverse()
    reversed.forEach(C => {
      if (C.prototype) {
        createInstanceAndRender(C)
      } else {
        renderInstance(C)
      }
    })
  } else {
    if (component.prototype) {
      createInstanceAndRender(component)
    } else {
      renderInstance(component)
    }
  }
}