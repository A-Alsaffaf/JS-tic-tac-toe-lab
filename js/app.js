/*-------------------------------- Constants --------------------------------*/
const initBoard = Array(9).fill(null)
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board = initBoard
console.log(board);
let turn = 'X'
let winner = false
let tie = false 




/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('.board')
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')


/*-------------------------------- Functions --------------------------------*/
function init() {


render()    
}

function render() {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    board.forEach((sqr, idx) => {
        squareEls[idx].textContent = sqr
    })
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`
    } else if (winner) {
        messageEl.textContent = `${turn} wins!`
    } else if (tie && !winner) {
        messageEl.textContent = `It's a tie!`
    }
}

function handleClick(event) {
    const clickedElement = event.target
    console.log(clickedElement);
    if (winner || tie) {
        console.log('game is over');
        return
    }else if (!clickedElement.classList.contains('sqr')) {
        console.log('its not a square');
        return
    }
    else if (clickedElement.classList.contains('sqr')) {
        const squareIndex = clickedElement.id
        if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
            console.log('Square is already taken');
            return
        }else if (board[squareIndex] === null) {
            placePiece(squareIndex)
            checkForWinner()
        }
    }
}

function placePiece(idx) {
    board[idx] = turn
    console.log(board);
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        if (board[combo[0]] !== null && board[combo[0]] === board[combo[1]] && board[combo[0] === board [combo[2]]]) {
            winner = true
        }
    })
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)

