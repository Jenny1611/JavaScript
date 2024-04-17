const celle = document.querySelectorAll('div div div')
const riga = document.querySelectorAll('div.riga')

let player1 = 0

function checkWinner() {
    if (riga) {
        console.log(`La cella ${celle.keys} non è vuota`);
    } else {
        console.log('Pareggio')
    }
}

celle.forEach(cella => {
    cella.addEventListener('click', (event) => {
        event.stopPropagation()
        if (event.target.className === '') {
            event.target.className = `player${player1 ? '1' : '2'}`
            checkWinner()
            player1 = !player1
        }
    })
})

/*
COMBINAZIONI:
1,2,3
4,5,6
7,8,9
1,5,9
3,5,7
*/