import { drawMenu } from './menu.js'
import { drawKickoff } from './kickoff.js'
import { displayToast } from './clientUtils.js'
import { drawKickoffStart } from './kickoff-start.js'
import { drawKickoffWait } from './kickoff-wait.js'
import { drawGame, drawCellValue, setGameInfoBox, drawTimeLeft, clearTimeLeft } from './game.js'
import { drawGameOver } from './game-over.js'

///////////////////
// Socket Events //
///////////////////

const socket = io()

// Basic 'message' Event
socket.on('message', message => {
    // Display Message Via Toast
    displayToast(message, 3000)
})

// On 'draw-menu' Event, Draw Menu Screen To Player
socket.on('draw-menu', () => {
    // Call Draw Menu Function From menu.js
    drawMenu()
})

// On 'draw-kickoff' when new Game Room is Initiated
socket.on('draw-kickoff', roomID => {
    // Call Draw Kickoff Function from kickoff.js
    drawKickoff(roomID)
})

// On 'kickoff-start' when opponent joins game
socket.on('kickoff-start', () => {
    // Call Draw Kickoff Start Function form kickoff-start.js
    drawKickoffStart()
})

// On 'kickoff-wait' when opponent joins game
socket.on('kickoff-wait', () => {
    // Call Draw Kickoff Wait Function form kickoff-wait.js
    drawKickoffWait()
})

// On 'draw-game' When Game is started
socket.on('draw-game', () => {
    // Call Draw Game Function form game.js
    drawGame()
})

// On 'draw-cell' from Server
socket.on('draw-cell', data => {
    let ctx = document.getElementById('game-canvas').getContext('2d')
    // Call Draw Cell Value From game.js
    drawCellValue(ctx, data)
})

// On Getting Game Info from Server to Update Info Box
socket.on('draw-game-info', data => {
    // Update Game Info Box
    setGameInfoBox(data)
})

// On 'draw-time-left' To View Timer
socket.on('draw-time-left', timeLeft => {
    // Call Draw Time Left From game.js
    drawTimeLeft(timeLeft)
})

// On 'game-over' Event From Server
socket.on('game-over', message => {
    // Call Game Over Function from game-over.js
    drawGameOver(message)
})

// On 'clear-time-left' Event from Server
socket.on('clear-time-left', () => {
    // Call Clear Time Left From game.js
    clearTimeLeft()
})

///////////////
// Functions //
///////////////

// Emit Create Game Room Event On Clicked 'Play' Button
export function emitCreateGameRoom() {
    socket.emit('create-game-room')
}

// Emit Join Game Room Event On Clicked 'Join' Button
export function emitJoinGameRoom(roomID) {
    socket.emit('join-game-room', roomID)
}

// Emit Cancel Game Event on 'Cancel' Clicked
export function emitCancelRoomEvent() {
    socket.emit('cancel-this-room')
}

// Emit Start Game Event On 'Start' Clicked
export function emitStartGame() {
    socket.emit('start-game')
}

// Emit cell Coordinates to server on click
export function emiCellCoordinates(cellCoordinates) {
    socket.emit('cell-clicked', cellCoordinates)
}

// Emit Go Back To Lobby Event
export function emitGoBackToLobby() {
    // Emit 'go-back-to-lobby' Event
    socket.emit('go-back-to-lobby')
}