export default function makeSelectable() {
  const noteElement = this.element
  const elem = this.element.querySelector('.note')
  
  const addSelectClass = () => {
    elem.classList.add('selected')
  }
  
  const removeSelectClass = () => {
    elem.classList.remove('selected')
  }
  
  if (this.props.selected) {
    addSelectClass()
  }
  
  noteElement.onmousedown = addSelectClass
  elem.onfocus = addSelectClass
  elem.onblur = removeSelectClass
  
  window.addEventListener('click', (e) => {
    e.target.offsetParent !== noteElement ? removeSelectClass() : null
  })
}