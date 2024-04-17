const celle = document.querySelectorAll('div div div')
const riga = document.querySelectorAll('div.riga')

let currentPlayer = 1
let playing = true
let counter1 = 0
let counter2 = 0

const updateCounters = () => {
    const counter1Element = document.getElementById('counter-1')
    const counter2Element = document.getElementById('counter-2')

    counter1Element.innerText = counter1
    counter2Element.innerText = counter2
}


let board = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const coloraBox = () => {
    board.forEach((elemento, idx) => {
        const box = document.getElementById(idx)
        if (box) {
            if (elemento !== 0) {
                box.className = 'player' + elemento
            } else {
                box.className = ''
            }
        }
    })
}

function checkWinner() {
    coloraBox()
    const winningState = wins.find(function (sitWin) {
        const posizione1 = sitWin[0];
        const posizione2 = sitWin[1];
        const posizione3 = sitWin[2];

        const valoreAllaPosizione1 = board[posizione1];
        const valoreAllaPosizione2 = board[posizione2];
        const valoreAllaPosizione3 = board[posizione3];

        return valoreAllaPosizione1 === valoreAllaPosizione2 &&
            valoreAllaPosizione2 === valoreAllaPosizione3 &&
            valoreAllaPosizione1 !== 0
    })

    if (winningState !== undefined) {
        const box1 = document.getElementById(winningState[0]);
        const box2 = document.getElementById(winningState[1]);
        const box3 = document.getElementById(winningState[2]);

        box1.className = 'win';
        box2.className = 'win';
        box3.className = 'win';

        const winningPlayer = board[winningState[0]]

        if(winningPlayer === 1) {
            counter1++
        } else {
            counter2++
        }

        alert(`Un giocatore ha vinto`)
        updateCounters()
        playing = false
    }
}


celle.forEach(cella => {
    cella.addEventListener('click', (event) => {
        event.stopPropagation()
        /*
        if (event.target.className === '') {
            event.target.className = `player${player1 ? '1' : '2'}`
            player1 = !player1
        }*/

        if (playing) {
            const posizione = parseInt(event.target.id)

            if (board[posizione] === 0) {
                board[posizione] = currentPlayer
            }

            checkWinner()

            currentPlayer = currentPlayer === 1 ? 2 : 1
        }
    })
})

const resetBoard = () => {
    board.fill(0)
    coloraBox()
    playing = true
}