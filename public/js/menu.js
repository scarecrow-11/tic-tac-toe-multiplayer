import { resetCanvas, drawText, getMousePosition, drawTextBorder, clearTextBorder, displayToast } from './clientUtils.js'
import { emitCreateGameRoom, emitJoinGameRoom } from './main.js'

// Menu Items Positions
const gameTitlePostion = {
    x: 350,
    y: 50,
    width: 145,
    height: 22
}

const copyrightPosition = {
    x: 412,
    y: 500,
    width: 80,
    height: 12
}

const playButtonPosition = {
    x: 203,
    y: 240,
    width: 75,
    height: 34
}

const joinButtonPosition = {
    x: 65,
    y: 120,
    width: 80,
    height: 32
}

const quitButtonPosition = {
    x: 320,
    y: 370,
    width: 87,
    height: 32
}

export function drawMenu() {
    // Reset Canvas Screen and get New Canvas Refs
    let { canvas, ctx } = resetCanvas()

    // Set Menu Items
    setMenuItems(canvas, ctx)

    ///////////////////////////////////////
    // Add Event Listeners To Menu Items //
    ///////////////////////////////////////

    // 'mouseover' Listener
    canvas.addEventListener('mousemove', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check For Each Button Position

        // Play Button
        if((mousePosition.x > playButtonPosition.x-5 && mousePosition.x < playButtonPosition.x+playButtonPosition.width+10) && (mousePosition.y > playButtonPosition.y-playButtonPosition.height-5 && mousePosition.y < playButtonPosition.y+25)) {
            drawTextBorder(ctx, 6, 'maroon', playButtonPosition.x-5, playButtonPosition.y-playButtonPosition.height-5, playButtonPosition.width+10, playButtonPosition.height+25)
        } else {
            clearTextBorder(ctx, 6, 'dimgrey',playButtonPosition.x-5, playButtonPosition.y-playButtonPosition.height-5, playButtonPosition.width+10, playButtonPosition.height+25)
        }

        // Join Button
        if((mousePosition.x > joinButtonPosition.x-5 && mousePosition.x < joinButtonPosition.x+joinButtonPosition.width+10) && (mousePosition.y > joinButtonPosition.y-joinButtonPosition.height-5 && mousePosition.y < joinButtonPosition.y+15)) {
            drawTextBorder(ctx, 6, 'maroon', joinButtonPosition.x-5, joinButtonPosition.y-joinButtonPosition.height-5, joinButtonPosition.width+10, joinButtonPosition.height+15)
        } else {
            clearTextBorder(ctx, 6, 'dimgrey', joinButtonPosition.x-5, joinButtonPosition.y-joinButtonPosition.height-5, joinButtonPosition.width+10, joinButtonPosition.height+15)
        }

        // Quit Button
        if((mousePosition.x > quitButtonPosition.x-5 && mousePosition.x < quitButtonPosition.x+quitButtonPosition.width+10) && (mousePosition.y > quitButtonPosition.y-quitButtonPosition.height-5 && mousePosition.y < quitButtonPosition.y+22)) {
            drawTextBorder(ctx, 6, 'maroon', quitButtonPosition.x-5, quitButtonPosition.y-quitButtonPosition.height-5, quitButtonPosition.width+10, quitButtonPosition.height+22)
        } else {
            clearTextBorder(ctx, 6, 'dimgrey', quitButtonPosition.x-5, quitButtonPosition.y-quitButtonPosition.height-5, quitButtonPosition.width+10, quitButtonPosition.height+22)
        }
    })

    // 'click' Listener
    canvas.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        // Get Mouse Position
        let mousePosition = getMousePosition(canvas, e)

        // Check for game Title Click
        if((mousePosition.x > gameTitlePostion.x-10 && mousePosition.x < mousePosition.x+gameTitlePostion.width+10) && (mousePosition.y > gameTitlePostion.y-gameTitlePostion.height-10 && mousePosition.y < gameTitlePostion.y+10)) {
            // Game Title
            // Rfresh window
            window.location.reload()
        }

        // Check for each Button Click
        if((mousePosition.x > playButtonPosition.x-5 && mousePosition.x < playButtonPosition.x+playButtonPosition.width+10) && (mousePosition.y > playButtonPosition.y-playButtonPosition.height-5 && mousePosition.y < playButtonPosition.y+25)) {
            // Play Button

            // Emit Create Game Room
            emitCreateGameRoom()

        } else if((mousePosition.x > joinButtonPosition.x-5 && mousePosition.x < joinButtonPosition.x+joinButtonPosition.width+10) && (mousePosition.y > joinButtonPosition.y-joinButtonPosition.height-5 && mousePosition.y < joinButtonPosition.y+15)) {
            // Join Button

            // Display Join Room Input Form
            let roomInputForm = document.getElementById('room-input-form')
            let roomInput = document.getElementById('room-input')
            let roomSubmitButton = document.getElementById('room-submit-button')
            let roomCancelButton = document.getElementById('room-input-cancel-button')

            roomInputForm.style.display = 'block'
            roomInput.value = ''
            roomInput.focus()

            roomSubmitButton.onclick = function() {
                // Get Room Input ID
                let roomID = roomInput.value.trim()
                if(!roomID) {
                    // Display Error Toast
                    displayToast('Room ID can\'t be empty!', 3000)
                    return
                } else {
                    // Emit Join game room Event
                    emitJoinGameRoom(roomID)
                }
            }

            roomCancelButton.onclick = function() {
                roomInput.value = ''
                roomInputForm.style.display = 'none'
            }

        } else if((mousePosition.x > quitButtonPosition.x-5 && mousePosition.x < quitButtonPosition.x+quitButtonPosition.width+10) && (mousePosition.y > quitButtonPosition.y-quitButtonPosition.height-5 && mousePosition.y < quitButtonPosition.y+22)) {
            // Quit Button

            // Display Promt
            let confirmation = confirm('Do you wish to quit game?')
            if(confirmation) {
                // Redirect to browser Home page
                window.location.href = 'https://www.google.com'
                
            } else {
                // Pass
            }
        }

    })
}

function setMenuItems(canvas, ctx) {
    // Set Menu Background
    setMenuBackground(canvas, ctx)

    // Set Game Title
    setGameTitle(ctx)

    // Set Copyright Text
    setCopyrightText(ctx)

    // Set Menu Buttons
    setMenuButtons(canvas, ctx)
}

function setMenuBackground(canvas, ctx) {
    // Set Menu Background Image
    let menuBackground = new Image()
    menuBackground.src = '../assets/menu-background.png'
    menuBackground.onload = function() {
        ctx.drawImage(menuBackground, 0, 0, menuBackground.width, menuBackground.height, 0, 0, canvas.width, canvas.height)
    }

    // Set Menu Bacground Color
    ctx.fillStyle = 'dimgrey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function setGameTitle(ctx) {
    // Draw Game Title Text
    drawText(ctx, 'Tic Tac Toe', '26', 'aqua', gameTitlePostion.x, gameTitlePostion.y)
    drawText(ctx, '( multiplayer )', '12', 'white', 412, 75)
}

function setCopyrightText(ctx) {
    // Draw Game Title Text
    drawText(ctx, 'Developed by', '12', 'white', 330, 500)
    drawText(ctx, 'Scarecrow', 'italic 16', 'aqua', copyrightPosition.x, copyrightPosition.y)
}

function setMenuButtons(canvas, ctx) {
    // Set 'Play' Button
    drawText(ctx, 'Play', '40', 'white', playButtonPosition.x, playButtonPosition.y)

    // Set Join Button
    drawText(ctx, 'Join', '40', 'white', joinButtonPosition.x, joinButtonPosition.y)

    // Set Quit Button
    drawText(ctx, 'Quit', '40', 'white', quitButtonPosition.x, quitButtonPosition.y)
}