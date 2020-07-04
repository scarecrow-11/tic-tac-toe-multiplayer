const { removeGameRoom } = require('../socket/roomManager')

// Start Game Function
function startGame(socket, gameRoom) {
    // Initiate New Game for the Game Room
    gameRoom.initiateGame('X')

    // Assign Player X and Player O
    gameRoom.game.assignPlayers(gameRoom.players)

    // Emit 'draw-game' to Players
    socket.emit('draw-game')
    socket.to(gameRoom.roomID).emit('draw-game')

    // Emit Game Info
    socket.emit('draw-game-info', { playerX: 'You', playerO: 'Opponent', turn: 'Yours' })
    socket.to(gameRoom.roomID).emit('draw-game-info', { playerX: 'Opponent', playerO: 'You', turn: 'Opponent\'s' })

    // Start Timer
    startTimer(socket, gameRoom)
}

// Update Game State
function updateGameState(socket, gameRoom, cellCoordinates) {
    let { game } = gameRoom
    // Validate Player Move
    if(!validatePlayerMove(socket, game, cellCoordinates)) {
        return
    } else {
        // Draw Cell On Canvas for both players
        socket.emit('draw-cell', { cellValue: game.turn, cellCoordinates })
        socket.to(gameRoom.roomID).emit('draw-cell', { cellValue: game.turn, cellCoordinates })

        // Update Game Board
        game.updateGameBoard(cellCoordinates)

        // Check if Game Over
        let gameOverData = game.isGameOver()

        // Check if game over
        if(gameOverData.isOver === true) {
            // Stop Timer
            clearInterval(game.intervalID)

            // Clear Time Left Display
            socket.emit('clear-time-left')
            socket.to(gameRoom.roomID).emit('clear-time-left')


            // Display Game Over Screen

            // If Draw
            if(gameOverData.isDrawn === true) {
                // Display Draw Message to Both
                socket.emit('game-over', 'Match Drawn :-|')
                socket.to(gameRoom.roomID).emit('game-over', 'Match Drawn :-|')

            } else {
                // Display Winner Message
                socket.emit('game-over', 'You Won :-)')
                socket.to(gameRoom.roomID).emit('game-over', 'You Lost :-(')
            }

            // Remove Game Room Object From Active Rooms List
            removeGameRoom(gameRoom.roomID)
            
        } else {
            // Toggle Turn
            game.toggleTurn()

            // Send Game Status Info
            if(game.turn === 'X') {
                socket.emit('draw-game-info', { playerX: 'Opponent', playerO: 'You', turn: 'Opponent\'s' })
                socket.to(gameRoom.roomID).emit('draw-game-info', { playerX: 'You', playerO: 'Opponent', turn: 'Your' })
                
            } else if(game.turn === 'O') {
                socket.emit('draw-game-info', { playerX: 'You', playerO: 'Opponent', turn: 'Opponent\'s' })
                socket.to(gameRoom.roomID).emit('draw-game-info', { playerX: 'Opponent', playerO: 'You', turn: 'Your' })
            }

            // Set Move Timer
            startTimer(socket, gameRoom)
        }
    }
}

// Check Player Validity
function validatePlayerMove(socket, game, cellCoordinates) {
    if(!game.isPlayerValid(socket.id)) {
        // If Not player's turn
        socket.emit('message', 'Opponent\'s Turn!!')
        return false
    } else if(!game.isCellAvailable(cellCoordinates)) {
        // If Cell Not Available
        socket.emit('message', 'Cell Not Available!!')
        return false
    } else {
        return true
    }
}

// Start Timer Function
function startTimer(socket, gameRoom) {
    let { game } = gameRoom

    // Reset Interval ID
    clearInterval(game.intervalID)

    // Move Timer
    game.resetMoveTimeLeft()

    game.intervalID = setInterval(() => {
        if(game.moveTimeLeft < 0) {
            clearInterval(game.intervalID)

            // Clear Time Left Section
            socket.emit('clear-time-left')
            socket.to(gameRoom.roomID).emit('clear-time-left')
            
            // Display Game Over
            socket.emit('game-over', 'You Won :-)')
            socket.to(gameRoom.roomID).emit('game-over', 'You Lost :-(')
            
            return
        }

        // Emit Time Left To players
        socket.emit('draw-time-left', game.moveTimeLeft)
        socket.to(gameRoom.roomID).emit('draw-time-left', game.moveTimeLeft)

        // Decrement Time Left
        game.moveTimeLeft--

    }, 1000)
}

// Export Stuff Here
module.exports = { startGame, updateGameState }