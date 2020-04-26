var origBoard;

const huPlayer = 'O'
const aiPlayer = 'X'

winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
]

const cell = document.getElementsByClassName('cell')
startGame()

function startGame() {
    document.querySelector(".endgame").style.display = "none"
    origBoard = Array.from(Array(9).keys())
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = ''
        cell[i].style.removeProperty('background-color')
        cell[i].addEventListener('click', turnClick, false)
        // the use of false here
    }
}

// function turnClick(square) {
//     turn(square.target.id, huPlayer)
// }

// Types of loops

function turnClick(square) {
    if(typeof origBoard[square.target.id] == "number") {
        turn(square.target.id, huPlayer)
    if(!checkTie()) turn(bestSpot(), aiPlayer)
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [] )
    let gameWon = null
    // We are using index not number
    for(let [index, win] of winCombo.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1) ) {
            gameWon = {index: index, player: player}
            break;
        }
    }

    return gameWon
}

function gameOver(gameWon) {
    for (let index of winCombo[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === huPlayer ? 'green' : 'red'
    }
    for(var i = 0; i < cell.length; i++) {
        cell[i].removeEventListener('click', turnClick, false)
    }
    whoWon(gameWon.player == huPlayer ? 'You won' : 'You lost')
}


function whoWon(who) {
    document.querySelector(".endgame").style.display = "block"
    document.querySelector(".endgame .text").innerText = who
}


function remainingSquares() {
    return origBoard.filter(e => typeof e == 'number')
}

function bestSpot() {
    return remainingSquares()[0]
}

function checkTie() {
    if(remainingSquares().length == 0) {
        for(var i = 0; i < cell.length; i++) {
            cell[i].style.backgroundColor = 'blue'
            cell[i].removeEventListener('click', turnClick, false)
        }
        whoWon("Tie Game")
        return true
    }
    return false
}