import { resetCanvas, getMousePosition, drawText } from './clientUtils.js'
import { emiCellCoordinates, emitCancelRoomEvent } from './main.js'

// Cell Positions
const cellOnePosition = {
    x: 35,
    y: 65,
    width: 165,
    height: 120
}

const cellTwoPosition = {
    x: 215,
    y: 65,
    width: 100,
    height: 120
}

const cellThreePosition = {
    x: 325,
    y: 65,
    width: 150,
    height: 120
}

const cellFourPosition = {
    x: 35,
    y: 195,
    width: 165,
    height: 115
}

const cellFivePosition = {
    x: 215,
    y: 195,
    width: 105,
    height: 110
}

const cellSixPosition = {
    x: 330,
    y: 195,
    width: 145,
    height: 110
}

const cellSevenPosition = {
    x: 35,
    y: 325,
    width: 160,
    height: 120
}

const cellEightPosition = {
    x: 210,
    y: 325,
    width: 110,
    height: 120
}

const cellNinePosition = {
    x: 330,
    y: 325,
    width: 145,
    height: 120
}

export function drawGame() {
    // Reset Canvas
    let { canvas, ctx } = resetCanvas()

    // Set Game Items
    setGameItems(canvas, ctx)

    // Add Event Listeners
    canvas.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        //////////////////////////////////////
        // Check for Cell Positions Clicked //
        //////////////////////////////////////
        if((mousePosition.x > cellOnePosition.x && mousePosition.x < cellOnePosition.x+cellOnePosition.width) && (mousePosition.y > cellOnePosition.y && mousePosition.y < cellOnePosition.y+cellOnePosition.height)) {
            // Cell One

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 0, cellCol: 0})
            return
        }

        else if((mousePosition.x > cellTwoPosition.x && mousePosition.x < cellTwoPosition.x+cellTwoPosition.width) && (mousePosition.y > cellTwoPosition.y && mousePosition.y < cellTwoPosition.y+cellTwoPosition.height)) {
            // Cell Two

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 0, cellCol: 1})
            return
        }

        else if((mousePosition.x > cellThreePosition.x && mousePosition.x < cellThreePosition.x+cellThreePosition.width) && (mousePosition.y > cellThreePosition.y && mousePosition.y < cellThreePosition.y+cellThreePosition.height)) {
            // Cell Three

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 0, cellCol: 2})
            return
        }

        else if((mousePosition.x > cellFourPosition.x && mousePosition.x < cellFourPosition.x+cellFourPosition.width) && (mousePosition.y > cellFourPosition.y && mousePosition.y < cellFourPosition.y+cellFourPosition.height)) {
            // Cell Four

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 1, cellCol: 0})
            return
        }

        else if((mousePosition.x > cellFivePosition.x && mousePosition.x < cellFivePosition.x+cellFivePosition.width) && (mousePosition.y > cellFivePosition.y && mousePosition.y < cellFivePosition.y+cellFivePosition.height)) {
            // Cell Five
            
            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 1, cellCol: 1})
            return
        }

        else if((mousePosition.x > cellSixPosition.x && mousePosition.x < cellSixPosition.x+cellSixPosition.width) && (mousePosition.y > cellSixPosition.y && mousePosition.y < cellSixPosition.y+cellSixPosition.height)) {
            // Cell Six

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 1, cellCol: 2})
            return
        }

        else if((mousePosition.x > cellSevenPosition.x && mousePosition.x < cellSevenPosition.x+cellSevenPosition.width) && (mousePosition.y > cellSevenPosition.y && mousePosition.y < cellSevenPosition.y+cellSevenPosition.height)) {
            // Cell Seven

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 2, cellCol: 0})
            return
        }

        else if((mousePosition.x > cellEightPosition.x && mousePosition.x < cellEightPosition.x+cellEightPosition.width) && (mousePosition.y > cellEightPosition.y && mousePosition.y < cellEightPosition.y+cellEightPosition.height)) {
            // Cell Eight

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 2, cellCol: 1})
            return
        }

        else if((mousePosition.x > cellNinePosition.x && mousePosition.x < cellNinePosition.x+cellNinePosition.width) && (mousePosition.y > cellNinePosition.y && mousePosition.y < cellNinePosition.y+cellNinePosition.height)) {
            // Cell Nine

            // Emit Clicked Cell Info
            emiCellCoordinates({ cellRow: 2, cellCol: 2})
            return
        }
    })
}

function setGameItems(canvas, ctx) {
    // Set Game Background
    setGameBackground(canvas, ctx)

    // Set Leave Game Button
    setLeaveGameButton()
}

function setGameBackground(canvas, ctx) {
    // Set Game Background Image
    let gameBackground = new Image()
    gameBackground.src = '../assets/game-background.png'
    gameBackground.onload = function() {
        ctx.drawImage(gameBackground, 0, 0, gameBackground.width, gameBackground.height, 0, 0, canvas.width, canvas.height)
    }

    // Set Menu Bacground Color
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export function setGameInfoBox(data) {
    let ctx = document.getElementById('game-canvas').getContext('2d')

    // Clear Box Area on Canvas
    ctx.clearRect(2, 2, 135, 60)
    
    // Set Background of Box
    ctx.fillStyle = 'dimgrey'
    ctx.fillRect(2, 2, 135, 60)

    // Set Player X and O Texts

    // Set Text Box
    ctx.strokeStyle = 'teal'
    ctx.strokeRect(2, 2, 135, 60)

    // Set Texts Labels
    drawText(ctx, 'Player X :', 12, 'white', 6, 20)
    drawText(ctx, 'Player O :', 12, 'white', 6, 36)
    drawText(ctx, 'Turn       :', 12,'white', 6, 52)

    // Set Text Values
    drawText(ctx, data.playerX, 'italic 12', 'aqua', 65, 20)
    drawText(ctx, data.playerO, 'italic 12', 'aqua', 65, 36)
    drawText(ctx, data.turn, 'italic 12', 'aqua', 65, 52)

}

function setLeaveGameButton() {
    let leaveGameButton = document.getElementById('leave-game-button')
    leaveGameButton.style.display = 'block'
    
    leaveGameButton.onclick = function() {
        // Display Confirmation Promt
        let confirmation = confirm('Do you wish to quit game?')
        if(confirmation) {
            // Emit Cancel Game Event
            emitCancelRoomEvent()
        } else {
            // Pass
        }
    }
}

export function drawCellValue(ctx, data) {
    let textX = 0
    let textY = 0
    let color = null

    // Check Against Each Cell
    if(data.cellCoordinates.cellRow === 0 && data.cellCoordinates.cellCol === 0) {
        // Cell One
        textX = cellOnePosition.x+80
        textY = cellOnePosition.y+80

    } else if(data.cellCoordinates.cellRow === 0 && data.cellCoordinates.cellCol === 1) {
        // Cell Two
        textX = cellTwoPosition.x+22
        textY = cellTwoPosition.y+80

    } else if(data.cellCoordinates.cellRow === 0 && data.cellCoordinates.cellCol === 2) {
        // Cell Three
        textX = cellThreePosition.x+30
        textY = cellThreePosition.y+80

    } else if(data.cellCoordinates.cellRow === 1 && data.cellCoordinates.cellCol === 0) {
        // Cell Four
        textX = cellFourPosition.x+75
        textY = cellFourPosition.y+80

    } else if(data.cellCoordinates.cellRow === 1 && data.cellCoordinates.cellCol === 1) {
        // Cell Five
        textX = cellFivePosition.x+22
        textY = cellFivePosition.y+80

    } else if(data.cellCoordinates.cellRow === 1 && data.cellCoordinates.cellCol === 2) {
        // Cell Six
        textX = cellSixPosition.x+25
        textY = cellSixPosition.y+78

    } else if(data.cellCoordinates.cellRow === 2 && data.cellCoordinates.cellCol === 0) {
        // Cell Seven
        textX = cellSevenPosition.x+70
        textY = cellSevenPosition.y+80

    } else if(data.cellCoordinates.cellRow === 2 && data.cellCoordinates.cellCol === 1) {
        // Cell Eight
        textX = cellEightPosition.x+22
        textY = cellEightPosition.y+78

    } else if(data.cellCoordinates.cellRow === 2 && data.cellCoordinates.cellCol === 2) {
        // Cell Nine
        textX = cellNinePosition.x+22
        textY = cellNinePosition.y+76
    }   

    // Set Color Based on Value
    if(data.cellValue === 'X') {
        color = 'maroon'
    } else if(data.cellValue === 'O') {
        color = 'aqua'
    }

    // Draw Value in the cell
    drawText(ctx, data.cellValue, '72', color, textX, textY)
}

export function drawTimeLeft(timeLeft) {
    let ctx = document.getElementById('game-canvas').getContext('2d')
    if(timeLeft < 0) {
        // Clear Time Left Section
        clearTimeLeft()

        return
    }

    // Clear Time Left Section
    clearTimeLeft()

    // Draw Time Left
    drawText(ctx, timeLeft, '20', 'white', 480, 30)
}

export function clearTimeLeft() {
    let ctx = document.getElementById('game-canvas').getContext('2d')

    // Clear Time Left Section
    ctx.clearRect(460, 10, 50, 30)

    // Fill Background
    ctx.fillStyle = 'grey'
    ctx.fillRect(460, 10, 50, 30)
}