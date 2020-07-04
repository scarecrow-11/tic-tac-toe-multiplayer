const shortid = require('shortid')
const GameRoom = require('./GameRoom')

// Active Rooms List
let activeGameRooms = []

// Join Lobby Function
function joinLobby(socket) {
    // Leave All Connected Rooms
    socket.leaveAll()

    // Join Lobby Room
    socket.join('lobby')

    // Emit 'draw-menu' Event To Player
    socket.emit('draw-menu')
}

// Create New Game Room
function createGameRoom(socket) {
    // Leave All Existing Rooms
    socket.leaveAll()

    // Create New Room ID
    let roomID = shortid.generate()

    // Create host Object
    let host = socket.id

    // Create Room Object
    let gameRoom = new GameRoom(roomID)

    // Add player
    gameRoom.addPlayer(host)

    // Join Game Room
    socket.join(gameRoom.roomID)

    // Add To Active Game Rooms
    activeGameRooms.push(gameRoom)

    // Emit 'draw-kickoff' Event
    socket.emit('draw-kickoff', gameRoom.roomID)

    return gameRoom
}

// Join Game Room Function
function joinGameRoom(socket, roomID) {
    // Get Available Room
    let availableRoom = getAvailableRoom(roomID)

    // Check if Room Available
    if(!availableRoom) {
        // Send Room Not Found Error Message
        socket.emit('message', 'Room Not Found!!')
        return
    } else if(!isRoomValid(availableRoom)) {
        // Send Room Not Found Error Message
        socket.emit('message', 'Room Already Full!!')
        return
    } else {
        // Leave All other Rooms
        socket.leaveAll()

        // Get Player ID
        let opponent = socket.id

        // Add Player to GameRoom Object
        availableRoom.addPlayer(opponent)

        // Join Player To Room
        socket.join(availableRoom.roomID)

        // Emit 'draw-kickoff-wait' to Opponent
        socket.emit('kickoff-wait')

        // Emit 'draw-kickoff-start' to Host
        socket.to(availableRoom.roomID).emit('kickoff-start')

        return availableRoom
    }
}

// Cancel Game Room
function cancelGameRoom(socket, gameRoom, io) {
    // Clear Timer If Game Exists
    if(gameRoom.game) {
        if(gameRoom.game.intervalID) {
            clearInterval(gameRoom.game.intervalID)
            socket.emit('clear-time-left')
            socket.to(gameRoom.roomID).emit('clear-time-left')
        }
    }

    // Leave All Rooms and Join Lobby
    let host = io.sockets.sockets[gameRoom.players[0]]
    let opponent = null
    if(gameRoom.players.length > 1) {
        opponent = io.sockets.sockets[gameRoom.players[1]]
    }

    // Emit 'Opponent Left' message to Opponent
    if(opponent) {
        socket.to(gameRoom.roomID).emit('message', 'Opponent has left. Going back to Lobby...')
        socket.to(gameRoom.roomID).emit('game-over', 'You Won :-)')
    }

    // Destroy GameRoom Object From activeGameRooms
    removeGameRoom(gameRoom.roomID)
    gameRoom = null
    
    // Delay Join Menu for Opponent
    if(socket.id === host.id) {
        if(opponent) {
            setTimeout(() => {
                joinLobby(opponent)
            }, 3000)
        }

        joinLobby(host)

    } else if(opponent && socket.id === opponent.id) {
        setTimeout(() => {
            joinLobby(host)
        }, 3000)

        joinLobby(opponent)
    }
}

function getAvailableRoom(roomID) {
    let availableRoom = null
    for(let i = 0; i < activeGameRooms.length; i++) {
        if(activeGameRooms[i].roomID === roomID) {
            availableRoom = activeGameRooms[i]
            break
        }
    }
    return availableRoom
}

function isRoomValid(availableRoom) {
    // Check Number of Players
    if(availableRoom.players.length >= 2 || availableRoom.players.length <= 0) {
        return false
    } else {
        return true
    }
}

function removeGameRoom(roomID) {
    activeGameRooms = activeGameRooms.filter(item => item.roomID !== roomID)
}

// Export Stuff
module.exports = { joinLobby, createGameRoom, joinGameRoom, cancelGameRoom, removeGameRoom }