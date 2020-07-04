function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomTurn() {
    let turn = 'X'
    let randValue = getRandomIntInclusive(0, 1)
    if(randValue === 0) {
        turn = 'O'
    } else if(randValue === 1) {
        turn = 'X'
    }

    return turn
}

// Export Stuff
module.exports = { generateRandomTurn }