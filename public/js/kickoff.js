import { resetCanvas, drawText, getMousePosition, displayToast, drawTextBorder, clearTextBorder } from './clientUtils.js'
import { emitCancelRoomEvent } from './main.js'

// Kickoff Items Position
const gameTitlePostion = {
    x: 350,
    y: 50,
    width: 145,
    height: 22
}

// Cancel Button Position
const cancelButtonPosition = {
    x: 350,
    y: 450,
    width: 88,
    height: 25
}

export function drawKickoff(roomID) {
    // Reset Canvas
    let { canvas, ctx } = resetCanvas()

    // Set Kickoff Items
    setKickoffItems(canvas, ctx, roomID)

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

    // Add Click Event Listener
    canvas.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Room ID Position
        if((mousePosition.x > 195 && mousePosition.x < 345) && (mousePosition.y > 215 && mousePosition.y < 250)) {
            // Copy Room ID to Clipboard
            copyRoomIdToClipboard(roomID)
        }

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

function setKickoffItems(canvas, ctx, roomID) {
    // Set Background Color
    setKickOffBackground(canvas, ctx)

    // Set Game Title
    setGameTitle(ctx)

    // Set Kickoff Waiting Message
    setKickoffWaitingMessage(ctx, roomID)

    // Set Cancel Button
    setKickoffCancelButton(ctx)
}

function setKickOffBackground(canvas, ctx) {
    // Set Kickoff Bacground Color
    ctx.fillStyle = 'dimgrey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setGameTitle(ctx) {
    // Draw Game Title Text
    drawText(ctx, 'Tic Tac Toe', '26', 'aqua', gameTitlePostion.x, gameTitlePostion.y)
    drawText(ctx, '( multiplayer )', '12', 'white', 412, 75)
}

function setKickoffWaitingMessage(ctx, roomID) {
    // Set Waiting Message Text
    drawText(ctx, 'Waiting for opponent...', '26', 'white', 120, 180)

    // Set Room ID Titles
    drawText(ctx, 'Room :', '22', 'white,', 120, 240)

    // Set Room ID values
    drawText(ctx, roomID, '22', 'aqua', 200, 240)

    // Set 'Click to copy' Text
    drawText(ctx, '( Click to copy )', 'italic 12', 'white', 350, 236)

    // Set Share Room ID To Friends
    drawText(ctx, 'Note :', '16', 'white', 130, 500)
    drawText(ctx, 'Share room ID to your friends.', 'italic 12', 'white', 190, 500)
}

function setKickoffCancelButton(ctx) {
    // Draw Kickoff Cancel Button
    drawText(ctx, 'Cancel', '30', 'white', cancelButtonPosition.x, cancelButtonPosition.y)
}

function copyRoomIdToClipboard(roomID) {
    let roomIdBox = document.getElementById('room-id-box')
    roomIdBox.value = roomID

    // Need Visible Element to Copy
    roomIdBox.style.display = 'block'
    roomIdBox.style.visibility = 'visible'

    // Focus Room ID Box
    roomIdBox.focus()

    // Copy Text
    roomIdBox.select()

    // For Mobile Devices
    roomIdBox.setSelectionRange(0, 99999)

    // Use Exec Command
    document.execCommand('copy')

    // Hide Room ID Box
    roomIdBox.style.display = 'none'
    roomIdBox.style.visibility = 'hidden'

    // Display Confirmation Toast
    displayToast('Copied Room ID: ' + roomID, 3000)
}