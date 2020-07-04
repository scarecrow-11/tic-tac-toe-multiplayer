import { resetCanvas, drawText, getMousePosition, drawTextBorder, clearTextBorder } from './clientUtils.js'
import { emitCancelRoomEvent } from './main.js'


// Kickoff Wait Items Positions
const gameTitlePostion = {
    x: 350,
    y: 50,
    width: 145,
    height: 22
}

const cancelButtonPosition = {
    x: 350,
    y: 450,
    width: 88,
    height: 25
}

export function drawKickoffWait() {
    // Reset Canvas
    let { canvas, ctx } = resetCanvas()

    // Set Kickoff Start Items
    setKickoffWaitItems(canvas, ctx)

    // Add Event Listeners

    // 'mousemove' Event
    canvas.addEventListener('mousemove', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Cancel Button
        if((mousePosition.x > cancelButtonPosition.x-7 && mousePosition.x < cancelButtonPosition.x+cancelButtonPosition.width+7) && (mousePosition.y > cancelButtonPosition.y-cancelButtonPosition.height-8 && mousePosition.y < cancelButtonPosition.y+8)) {
            // Draw Text Border
            drawTextBorder(ctx, 6, 'maroon', cancelButtonPosition.x-7, cancelButtonPosition.y-cancelButtonPosition.height-7, cancelButtonPosition.width+14, cancelButtonPosition.height+16)
        } else {
            // Clear Text Border
            clearTextBorder(ctx, 6, 'dimgrey', cancelButtonPosition.x-7, cancelButtonPosition.y-cancelButtonPosition.height-7, cancelButtonPosition.width+14, cancelButtonPosition.height+16)
        }
    })

    // Add 'click' Event
    canvas.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Cancel Button
        if((mousePosition.x > cancelButtonPosition.x-7 && mousePosition.x < cancelButtonPosition.x+cancelButtonPosition.width+7) && (mousePosition.y > cancelButtonPosition.y-cancelButtonPosition.height-8 && mousePosition.y < cancelButtonPosition.y+8)) {
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

function setKickoffWaitItems(canvas, ctx) {
    // Set Background Color
    setKickOffWaitBackground(canvas, ctx)

    // Set Game Title
    setGameTitle(ctx)

    // Set Kickoff Wait Message
    setKickOffWaitMessage(ctx)

    // Set Kickoff Wait Cancel Button
    setKickoffCancelButton(ctx)
}

function setKickOffWaitBackground(canvas, ctx) {
    // Set Kickoff Wait Bacground Color
    ctx.fillStyle = 'dimgrey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setGameTitle(ctx) {
    // Draw Game Title Text
    drawText(ctx, 'Tic Tac Toe', '26', 'aqua', gameTitlePostion.x, gameTitlePostion.y)
    drawText(ctx, '( multiplayer )', '12', 'white', 412, 75)
}

function setKickOffWaitMessage(ctx) {
    // Set Waiting Message Text
    drawText(ctx, 'Waiting for Host to Start...', '26', 'white', 95, 180)
}

function setKickoffCancelButton(ctx) {
    // Draw Kickoff Cancel Button
    drawText(ctx, 'Cancel', '30', 'white', cancelButtonPosition.x, cancelButtonPosition.y)
}