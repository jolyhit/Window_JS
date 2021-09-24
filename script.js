let createBtn = document.querySelector(".createBtn")
if (createBtn) createBtn.onclick = createWindow
let zIndex = 1
let windowCount = 1

function createWindow() {
	let mainWindow = document.createElement('div'), head = document.createElement('div'), body = document.createElement('div'),
		headText = document.createElement('div'), close = document.createElement('div'), hide = document.createElement('div')
	mainWindow.append(head, body)
	head.append(headText, hide, close)
	head.onmousedown = onMouseDown
	head.onmouseup = onMouseUp
	head.onmousemove = onMouseMove
	headText.textContent = 'Window №' + windowCount++
	mainWindow.className = 'window'
	head.className = 'head'
	body.className = 'body'
	close.className = 'close'
	hide.className = 'hide'
	close.onclick = closeWindow
	hide.onclick = hideWindow
	mainWindow.onmousedown = topWind
	document.body.append(mainWindow)
}

function topWind() {
	if (this.classList.contains('hidden')) return;
	this.style.zIndex = '' + (zIndex++)
	let windows = document.querySelectorAll('.window.top');
	for (let i = 0; i < windows.length; i++) {
		windows[i].classList.remove('top')
	}
	this.classList.add('top')
}

function onMouseDown(e) {
	if (this.closest('.window.hidden')) return
	this.dataset.isMove = true
	this.dataset.x = '' + e.clientX.y
	this.dataset.y = '' + e.clientX.x
}

function onMouseUp() {
	this.dataset.isMove = 'false'
}

function onMouseMove(e) {
	if (this.dataset.isMove !== 'true') return
	let x = e.clientX - +this.dataset.x
	let y = e.clientY - +this.dataset.y
	let bound = this.parentElement.getBoundingClientRect()
	this.parentElement.style.left = `${bound.left + x}px`
	this.parentElement.style.top = `${bound.top + y}px`
	this.dataset.x = "" + e.clientX
	this.dataset.y = "" + e.clientY
}

function closeWindow() {
	let window = this.closest('.window')
	if (window) window.remove()
}

function hideWindow() {
	let window = this.closest('.window')
	if (!window) return
	if (window.classList.contains('hidden')) {
		window.classList.add('top')
		window.classList.remove('hidden')
		if (typeof window.onmousedown === 'function') window.onmousedown.call(window)
		document.body.append(window)
		return
	}
	let hiddenContainer = document.querySelector("#HiddenContainer")
	if (!hiddenContainer) {
		hiddenContainer = document.createElement('div')
		hiddenContainer.className = 'hidden-container'
		hiddenContainer.id = 'HiddenContainer'
		hiddenContainer.parentElement = document.body
	}
	window.classList.remove('top')
	window.classList.add('hidden')
	document.body.append(hiddenContainer)
	hiddenContainer.append(window)

}


