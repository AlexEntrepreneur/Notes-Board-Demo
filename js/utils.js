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