const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

// Import Local Libraries
const { joinLobby, createGameRoom, joinGameRoom, cancelGameRoom } = require('./socket/roomManager')
const { startGame, updateGameState } = require('./game/gameEngine')

// Create Express App
const app = express()

// Apply Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Create Http Server
const server = http.createServer(app)

// Create Socket IO Object
const io = socketIO(server)

// Express set Static Route
app.use(express.static(path.join(__dirname, 'public')))

// On Client Connection To Server
io.on('connection', socket => {
    // Global Variables
    let gameRoom = null

    // Set Up AppState and Join To Lobby
    joinLobby(socket)

    // On 'create-game-room' from Player
    socket.on('create-game-room', () => {
        // Create New Game Room
        gameRoom = createGameRoom(socket)
    })

    // On 'join-game-room' from Player
    socket.on('join-game-room', roomID => {
        // Join Game Room
        gameRoom = joinGameRoom(socket, roomID)
    })

    // On 'cancel-this-room' From Kickoff Start or Kickoff Wait
    socket.on('cancel-this-room', () => {
        // Cancel Game Room And redirect to Lobby
        cancelGameRoom(socket, gameRoom, io)
    })

    // On 'start-game' From Kickoff Start
    socket.on('start-game', () => {
        startGame(socket, gameRoom)
    })

    // On Cell Clicked From Game Screen
    socket.on('cell-clicked', cellCoordinates => {
        // Update Game State (Handles Error Inside)
        updateGameState(socket, gameRoom, cellCoordinates)
    })

    // On 'go-back-to-lobby' Event From Game Over
    socket.on('go-back-to-lobby' , () => {
        joinLobby(socket)
    })
})

// Server Listen on PORT
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log('Server is listening on PORT: ' + PORT)
})