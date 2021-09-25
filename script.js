let createBtn = document.querySelector(".createBtn")
if (createBtn) createBtn.onclick = createWindow
let zIndex = 1
let windowCount = 1
let maximize = 1

function createWindow() {
	let mainWindow = document.createElement('div'), head = document.createElement('div'), body = document.createElement('div'),
		headText = document.createElement('div'), close = document.createElement('div'), hide = document.createElement('div'),
		maximize = document.createElement('div')
	mainWindow.append(head, body)
	head.append(headText, hide, maximize, close)
	head.onmousedown = onMouseDown
	head.onmouseup = onMouseUp
	head.onmousemove = onMouseMove
	headText.textContent = 'Window №' + windowCount++
	mainWindow.className = 'window'
	maximize.className = 'maximize'
	head.className = 'head'
	body.className = 'body'
	close.className = 'close'
	hide.className = 'hide'
	maximize.onclick = maximizeWindow
	head.ondblclick = maximizeWindow
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
	let window = this.closest('.window')
	if (this.closest('.window.hidden') || window.dataset.maximize == 1 || window.classList.contains('hidden')) return
	this.dataset.isMove = 'true'
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
function resizeWindow(){

}
function maximizeWindow() {
	let window = this.closest('.window')
	if (!window) return
	if (window){
		if (window.dataset.maximize === '1'){
			window.dataset.maximize = 0
			window.style.left =  window.dataset.left + 'px'
			window.style.top =  window.dataset.top + 'px'
			window.style.height =  window.dataset.height + 'px'
			window.style.width =  window.dataset.width + 'px'
			window.style.right = null
			window.style.bottom = null
		}else{
			let bound = window.getBoundingClientRect()
			window.dataset.width = '' + bound.width
			window.dataset.height = '' + bound.height
			window.dataset.left = '' + bound.left
			window.dataset.top = '' + bound.top
			window.style.left = '0px'
			window.style.right = '0px'
			window.style.top = '0px'
			window.style.bottom = '0px'
			window.style.width = 'auto'
			window.style.height = 'auto'
			window.dataset.maximize = '1'
		}
	}
}


