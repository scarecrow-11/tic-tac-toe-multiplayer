import { emitGoBackToLobby } from './main.js'

export function drawGameOver(message) {
    // Get Canvas Refs
    let canvas = document.getElementById('game-canvas')
    let ctx = canvas.getContext('2d')

    // Freeze canvas
    canvas.style.pointerEvents = 'none'

    // Set Game Over Items
    setGameOverItems(canvas, ctx, message)
}

function setGameOverItems(canvas, ctx, message) {
    // Draw Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Display Game Over Message
    ctx.font = '36px Comic Sans MS'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(message, (canvas.width/2), (canvas.height/2))

    // Back To Lobby Button
    let backToLobbyButton = document.getElementById('back-to-lobby-button')
    backToLobbyButton.style.display = 'block'

    // Hide Leave Game
    document.getElementById('leave-game-button').style.display = 'none'

    // Add Event Listener
    backToLobbyButton.onclick = function() {
        // Get Back To Lobby
        // Emit 'go-back-to-lobby' Event
        emitGoBackToLobby()
    }
}