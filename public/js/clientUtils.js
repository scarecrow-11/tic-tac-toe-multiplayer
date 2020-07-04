export function resetCanvas () {
    // Clone and replace Canvas.. To Remove All Event Listeners
    let oldCanvas = document.getElementById('game-canvas')
    let newCanvas = oldCanvas.cloneNode(true)
    oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas)
    // Unfreeze canvas
    newCanvas.style.pointerEvents = 'auto'

    let ctx = newCanvas.getContext('2d')

    // Clear Canvas Drawings
    ctx.clearRect(0, 0, newCanvas.width, newCanvas.height)

    // Hide Other Buttons
    document.getElementById('room-input-form').style.display = 'none'
    document.getElementById('room-id-box').style.display = 'none'
    document.getElementById('back-to-lobby-button').style.display = 'none'
    document.getElementById('leave-game-button').style.display = 'none'

    // Return New Canvas Refs
    return {
        canvas: newCanvas,
        ctx
    }
}

export function drawText(ctx, text, fontSize, color, x, y) {
    ctx.font = fontSize + 'px ' + 'Comic Sans MS'
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

export function drawTextBorder(ctx, lineWidth, color, x, y, width, height) {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.strokeRect(x, y, width, height)
}

export function clearTextBorder(ctx, lineWidth, background, x, y, width, height) {
    ctx.strokeStyle = background
    ctx.lineWidth = lineWidth
    ctx.strokeRect(x, y, width, height)
}

export function getMousePosition(canvas, e) {
    let rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX-rect.left,
      y: e.clientY-rect.top
    }
}

export function displayToast(message, duration) {
    // Get the snackbar DIV
    let x = document.getElementById('snackbar')
    x.innerHTML = message

    // Add the "show" class to DIV
    x.className = 'show'

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => {
        x.className = x.className.replace('show', '')
    }, duration)
}