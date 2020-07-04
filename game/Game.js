module.exports = class Game {
    constructor(turn) {
        this.board = [[null, null, null], [null, null, null], [null, null, null]]
        this.turn = turn
        this.playerX = null
        this.playerO = null
        this.moveTimeLeft = 10
        this.intervalID = null
    }

    assignPlayers(players) {
        this.playerX = players[0]
        this.playerO = players[1]
    }

    isCellAvailable(cellCoordinates) {
        if(this.board[cellCoordinates.cellRow][cellCoordinates.cellCol] !== null) {
            return false
        } else {
            return true
        }
    }

    isPlayerValid(player) {
        if((this.turn === 'X' && player === this.playerO) || (this.turn === 'O' && player === this.playerX)) {
            return false
        } else {
            return true
        }
    }

    updateGameBoard(cellCoordinates) {
        this.board[cellCoordinates.cellRow][cellCoordinates.cellCol] = this.turn
    }

    isGameOver() {
        let gameOverData = {
            isOver: false,
            isDrawn: false,
            winner: null
        }

        let countX = 0
        let countO = 0
        let nullFound = false

        // Check Rows
        for(let i = 0; i < 3; i++) {
            countX = 0
            countO = 0
            for(let j = 0; j < 3; j++) {
                if(this.board[i][j] === 'X') {
                    countX++
                } else if(this.board[i][j] === 'O') {
                    countO++
                }
            }

            // Check Counts
            if(countX >= 3) {
                gameOverData.isOver = true
                gameOverData.isDrawn = false
                gameOverData.winner = 'X'

                return gameOverData

            } else if(countO >= 3) {
                gameOverData.isOver = true
                gameOverData.isDrawn = false
                gameOverData.winner = 'O'

                return gameOverData
            }
        }

        // Check Columns
        countX = 0
        countO = 0
        for(let i = 0; i < 3; i++) {
            countX = 0
            countO = 0
            for(let j = 0; j < 3; j++) {
                if(this.board[j][i] === 'X') {
                    countX++
                } else if(this.board[j][i] === 'O') {
                    countO++
                }
            }

            // Check Counts
            if(countX >= 3) {
                gameOverData.isOver = true
                gameOverData.isDrawn = false
                gameOverData.winner = 'X'

                return gameOverData

            } else if(countO >= 3) {
                gameOverData.isOver = true
                gameOverData.isDrawn = false
                gameOverData.winner = 'O'

                return gameOverData
            }
        }

        // Check Left to Right Diagonal
        countX = 0
        countO = 0
        for(let i = 0, j = 0; i < 3 && j < 3; i++, j++) {
            if(this.board[i][j] === 'X') {
                countX++
            } else if(this.board[i][j] === 'O') {
                countO++
            }
        }

        // Check Counts
        if(countX >= 3) {
            gameOverData.isOver = true
            gameOverData.isDrawn = false
            gameOverData.winner = 'X'

            return gameOverData

        } else if(countO >= 3) {
            gameOverData.isOver = true
            gameOverData.isDrawn = false
            gameOverData.winner = 'O'

            return gameOverData
        }

        // Check Right to Left Diagonal
        countX = 0
        countO = 0
        for(let i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
            if(this.board[i][j] === 'X') {
                countX++
            } else if(this.board[i][j] === 'O') {
                countO++
            }
        }

        // Check Counts
        if(countX >= 3) {
            gameOverData.isOver = true
            gameOverData.isDrawn = false
            gameOverData.winner = 'X'

            return gameOverData

        } else if(countO >= 3) {
            gameOverData.isOver = true
            gameOverData.isDrawn = false
            gameOverData.winner = 'O'

            return gameOverData
        }

        // Check For Draw State
        nullFound = false
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.board[i][j] === null) {
                    nullFound = true
                }
            }

            if(nullFound) {
                break
            }
        }

        // Check nullFlag for Draw State
        if(!nullFound) {
            gameOverData.isOver = true
            gameOverData.isDrawn = true
            gameOverData.winner = null

            return gameOverData
        }

        return gameOverData
    }

    toggleTurn() {
        if(this.turn === 'X') {
            this.turn = 'O'
        } else if(this.turn === 'O') {
            this.turn = 'X'
        }
    }

    resetMoveTimeLeft() {
        this.moveTimeLeft = 10
    }
}