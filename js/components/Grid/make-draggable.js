function handleMouseDown(e) {
  this.setState((state) => ({
    ...state,
    isDragging: true,
    initialMousePos: { x: e.clientX, y: e.clientY },
    initialScrollPos: { x: window.scrollX, y: window.scrollY }
  }))
}

function handleMouseMove(e) {
  if (this.state.isDraggable && this.state.isDragging) {
    const distanceX = e.clientX - this.state.initialMousePos.x
    const distanceY = e.clientY - this.state.initialMousePos.y
    const newScrollPosX = this.state.initialScrollPos.x - distanceX
    const newScrollPosY = this.state.initialScrollPos.y - distanceY
    window.scrollTo(newScrollPosX, newScrollPosY)
  }
}

function handleMouseUp() {
  this.setState((state) => ({ ...state, isDragging: false }))
}

export default function makeDraggable() {
  this.element.addEventListener("mousedown", handleMouseDown.bind(this));
  this.element.addEventListener("mousemove", handleMouseMove.bind(this));
  window.addEventListener("mouseup", handleMouseUp.bind(this))
}