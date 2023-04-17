export function generateId() {
  let ID = ""
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36))
  }
  return ID
}

export function parseSVG(s) {
  const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div")
  div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>"
  const frag = document.createDocumentFragment()
  while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild)

  return frag;
}

export function deltaToElementCoords(startX, startY, endX, endY) {
  return {
    originX: endX < startX ? endX : startX,
    originY: endY < startY ? endY : startY,
    width: Math.abs(startX - endX),
    height: Math.abs(startY - endY)
  }
}

export function roundValueToUnit(unit, value) {
  if (value % unit === 0) return value
  return Math.round(value / unit) * unit
}

export function snapCoordsToGrid(coords, gridUnit) {
  return {
    originX: roundValueToUnit(gridUnit, coords.originX),
    originY: roundValueToUnit(gridUnit, coords.originY),
    width: roundValueToUnit(gridUnit, coords.width),
    height: roundValueToUnit(gridUnit, coords.height)
  }
}