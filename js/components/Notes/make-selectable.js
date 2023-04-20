export default function makeSelectable() {
  const noteElement = this.element
  const elem = this.element.querySelector('.note')
  
  window.addEventListener('mousedown', (e) => {
    e.target.offsetParent !== noteElement ? elem.classList.remove('selected') : null
  })
  
  noteElement.onmousedown = () => {
    elem.classList.add('selected')
  }
}