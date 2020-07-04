const Game = require('../game/Game')

module.exports = class GameRoom {
    constructor(roomID) {
        this.roomID = roomID
        this.players = []
        this.game = null
    }

    addPlayer(player) {
        this.players.push(player)
    }

    initiateGame(turn) {
        this.game = new Game(turn)
    }

    resetGame() {
        if(this.game !== null) {
            this.game = null
        }
    }
}