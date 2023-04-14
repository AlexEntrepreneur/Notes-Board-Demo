import { Component } from '../simpleflux/index.js'

export default class DrawingMenu extends Component {
  constructor() {
    super()
    this.state = {
      items: [
      {
        name: 'create-note',
        icon: '/assets/plus-icon.svg',
        action: () => { }
      }
      ]
    }
    this.css = `
      .drawing-menu {
        background: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0 0 62px rgba(65, 72, 75, .24);
        position: fixed;
        top: 18px;
        left: 26px;
        width: 55px;
        min-height: 55px;
        z-index: 1;
      }
      .drawing-menu button {
        width: 100%;
        height: 55px;
        background: none;
        border: none;
        padding: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 23px;
        cursor: pointer;
      }
    `
    this.injectCSS()
  }
  
  mount() {
    const el = document.createElement('div')
    el.classList.add('drawing-menu')
    
    this.state.items.forEach(item => {
      const menuButton = document.createElement('button')
      menuButton.style.backgroundImage = `url(${item.icon})`
      menuButton.onclick = item.action
      el.appendChild(menuButton)
    })
    
    this.element = el
    
    return this
  }
}