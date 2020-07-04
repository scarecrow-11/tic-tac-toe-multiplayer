import { resetCanvas, drawText, getMousePosition, drawTextBorder, clearTextBorder } from './clientUtils.js'
import { emitCancelRoomEvent, emitStartGame } from './main.js'

// Kickoff Start Items Positions
const gameTitlePostion = {
    x: 350,
    y: 50,
    width: 145,
    height: 22
}

const startButtonPosition = {
    x: 203,
    y: 250,
    width: 105,
    height: 32
}

const cancelButtonPosition = {
    x: 350,
    y: 450,
    width: 88,
    height: 25
}

export function drawKickoffStart() {
    // Reset Canvas
    let { canvas, ctx } = resetCanvas()

    // Set Kickoff Start Items
    setKickoffStartItems(canvas, ctx)

    // Add Event Listeners

    // Add 'mouseover' Listener
    canvas.addEventListener('mousemove', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Button Positions

        // Start Button
        if((mousePosition.x > startButtonPosition.x-5 && mousePosition.x < startButtonPosition.x+startButtonPosition.width+5) && (mousePosition.y > startButtonPosition.y-startButtonPosition.height-5 && mousePosition.y < startButtonPosition.y+10)) {
            // Draw Text Border
            drawTextBorder(ctx, 6, 'maroon', startButtonPosition.x-5, startButtonPosition.y-startButtonPosition.height-5, startButtonPosition.width+10, startButtonPosition.height+15)
        } else {
            // Clear Text Border
            clearTextBorder(ctx, 6, 'dimgrey', startButtonPosition.x-5, startButtonPosition.y-startButtonPosition.height-5, startButtonPosition.width+10, startButtonPosition.height+15)
        }

        // Cancel Button
        if((mousePosition.x > cancelButtonPosition.x-7 && mousePosition.x < cancelButtonPosition.x+cancelButtonPosition.width+7) && (mousePosition.y > cancelButtonPosition.y-cancelButtonPosition.height-8 && mousePosition.y < cancelButtonPosition.y+8)) {
            // Draw Text Border
            drawTextBorder(ctx, 6, 'maroon', cancelButtonPosition.x-7, cancelButtonPosition.y-cancelButtonPosition.height-7, cancelButtonPosition.width+14, cancelButtonPosition.height+16)
        } else {
            // Clear Text Border
            clearTextBorder(ctx, 6, 'dimgrey', cancelButtonPosition.x-7, cancelButtonPosition.y-cancelButtonPosition.height-7, cancelButtonPosition.width+14, cancelButtonPosition.height+16)
        }
    })

    // Add 'click' Listener
    canvas.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Each Buttons
        if((mousePosition.x > startButtonPosition.x-5 && mousePosition.x < startButtonPosition.x+startButtonPosition.width+5) && (mousePosition.y > startButtonPosition.y-startButtonPosition.height-5 && mousePosition.y < startButtonPosition.y+10)) {
            // Start button
            
            // Emit 'start-game' Event
            emitStartGame()

        } else if((mousePosition.x > cancelButtonPosition.x-7 && mousePosition.x < cancelButtonPosition.x+cancelButtonPosition.width+7) && (mousePosition.y > cancelButtonPosition.y-cancelButtonPosition.height-8 && mousePosition.y < cancelButtonPosition.y+8)) {
            // Cancel Button

            // Display Confirmation Promt
            let confirmation = confirm('Do you wish to quit game?')
            if(confirmation) {
                // Emit Cancel Game Event
                emitCancelRoomEvent()
            } else {
                // Pass
            }
        }
    })
}

function setKickoffStartItems(canvas, ctx) {
    // Set Background Color
    setKickOffStartBackground(canvas, ctx)

    // Set Game Title
    setGameTitle(ctx)

    // Set Kickoff Start Message
    setKickOffStartMessage(ctx)

    // Set Start Button
    setKickoffStartButton(ctx)

    // Set Kickoff Start Cancel Button
    setKickoffCancelButton(ctx)
}

function setKickOffStartBackground(canvas, ctx) {
    // Set Kickoff Start Bacground Color
    ctx.fillStyle = 'dimgrey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setGameTitle(ctx) {
    // Draw Game Title Text
    drawText(ctx, 'Tic Tac Toe', '26', 'aqua', gameTitlePostion.x, gameTitlePostion.y)
    drawText(ctx, '( multiplayer )', '12', 'white', 412, 75)
}

function setKickOffStartMessage(ctx) {
    // Set Waiting Message Text
    drawText(ctx, 'Opponent has joined...', '26', 'white', 120, 180)
}

function setKickoffStartButton(ctx) {
    // Draw Kickoff Start Button
    drawText(ctx, 'Start', '40', 'aqua', startButtonPosition.x, startButtonPosition.y)
}

function setKickoffCancelButton(ctx) {
    // Draw Kickoff Cancel Button
    drawText(ctx, 'Cancel', '30', 'white', cancelButtonPosition.x, cancelButtonPosition.y)
}