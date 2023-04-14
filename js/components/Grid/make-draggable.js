export default function makeDraggable() {
  let isDragging = true
  const initialMousePos = { x: 0, y: 0 };
  const initialScrollPos = { x: 0, y: 0 };

  function handleMouseDown(e) {
    isDragging = true
    initialMousePos.x = e.clientX
    initialMousePos.y = e.clientY
    initialScrollPos.x = window.scrollX
    initialScrollPos.y = window.scrollY
  }
  
  function handleMouseMove(e) {
    if (isDragging) {
      const distanceX = e.clientX - initialMousePos.x
      const distanceY = e.clientY - initialMousePos.y
      const newScrollPosX = initialScrollPos.x - distanceX
      const newScrollPosY = initialScrollPos.y - distanceY
      window.scrollTo(newScrollPosX, newScrollPosY)
    }
  }
  
  function handleMouseUp() {
    isDragging = false
  }
  
  this.element.addEventListener("mousedown", handleMouseDown);
  this.element.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp)
}