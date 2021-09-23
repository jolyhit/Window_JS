let createBtn = document.querySelector(".createBtn")
createBtn.onclick = createWindow
let zIndex = 1;
let windowVis
let coordinates
let hide = document.documentElement.clientHeight - 50

function createWindow() {
	let mainWindow = document.createElement('div'), head = document.createElement('div'), body = document.createElement('div'),
		headText = document.createElement('div'), close = document.createElement('div'), hide = document.createElement('div')
	mainWindow.append(head, body)
	head.append(headText, hide, close)
	head.onmousedown = onMouseDown
	head.onmouseup = onMouseUp
	head.onmousemove = onMouseMove
	head.onmouseout = onMouseOut
	headText.textContent = 'This Window'
	mainWindow.id = 'window'
	head.id = 'head'
	body.className = 'body'
	close.className = 'close'
	hide.className = 'hide'
	close.onclick = CloseWindow
	hide.onclick = HideWindow
	document.body.append(mainWindow)
	windowVis = true
	let win = this.parentElement
	let bound = win.getBoundingClientRect()
	coordinates = bound
}

function onMouseDown(e) {
	this.dataset.isMove = true
	this.dataset.x = '' + e.clientX.datase
	this.dataset.y = '' + e.clientX.datase
	this.parentElement.style.zIndex = '' + (zIndex++)
}

function onMouseUp() {
	this.dataset.isMove = false
}

function onMouseOut() {
	this.dataset.isMove = false
}

function onMouseMove(e) {
	if (this.dataset.isMove != 'true') return
	let win = this.parentElement
	let bound = win.getBoundingClientRect()
	win.style.top = '' + (bound.top + (e.clientY - +this.dataset.y)) + 'px'
	win.style.left = '' + (bound.left + (e.clientX - +this.dataset.x)) + 'px'
	this.dataset.x = e.clientX
	this.dataset.y = e.clientY
	coordinates = bound
}

function CloseWindow(e) {
	let window = e.target.closest('#window')
	if (window) window.remove()
}

function HideWindow(e) {
	let window = e.target.closest('#window')
	if (windowVis) {
		window.style.left = '5px'
		window.style.top = hide + 'px'
		hide -= 50
		e.target.closest('#head').style.visibility = 'visible'
		window.style.visibility = 'hidden'
		windowVis = false
	} else {
		window.style.left = coordinates.left + 'px'
		window.style.top = coordinates.top + 'px'
		window.style.visibility = 'visible'
		windowVis = true
		hide += 50
	}
}


