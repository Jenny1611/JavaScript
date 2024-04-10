/*
Esercizio 1
Scrivere una funzione JS SommaNumeri() che preso un valore, 
fa la somma da 1 a quel valore e me la restituisce

console.log(SommaNumeri(5)) // 15
*/
function sommaNumeri(numero) {
    let somma = 0

    for (let i = 1; i <= numero; i++) {
        somma += i;
    }

    return somma
}

console.log(sommaNumeri(5))

/*
Esercizio 2
Scrivere una funzione per generare un oggetto casa.
Ricevere parametri:
 - indirizzo
 - numero porte
 - superficie in mq

Espone:
 - metodo accendiRiscaldamento() 
 - metodo spegniRiscaldamento()
 - metodo switchaRiscaldamento()
 - metodo statoRiscaldamento() // 'acceso' o 'spento'?
*/

const Casa = (indirizzo, numeroPorte, mq) => {
    let riscaldamentoAcceso = false

    return {
        indirizzo,
        numeroPorte,
        mq,
        accendiRiscaldamento: () => {
            riscaldamentoAcceso = true
        },
        spegniRiscaldamento: () => {
            riscaldamentoAcceso = false
        },
        switchaRiscaldamento: () => {
            riscaldamentoAcceso != riscaldamentoAcceso
        },
        statoRiscaldamento: () => riscaldamentoAcceso ? 'acceso' : 'spento'
    }
}

const casa1 = Casa('Via Ciao 27/b', 2, 100)

/*
Esercizio 3
Scrivere una funzione per generare un oggetto inquilino.
Riceve parametri:
 - nome
 - anno di nascita

Espone:
 - metodo saluta() // 'Ciao sono <nome>, ho N anni'
*/

const Inquilino = (nome, annoDiNascita) => {
    const data = new Date()
    const annoCorrente = data.getFullYear()

    return {
        saluta: () => {
            let anni = annoCorrente - annoDiNascita
            console.log('Ciao sono ' + nome + ', ho ' + anni + ' anni')
        }
    }
}

const inquilino1 = Inquilino('Giulio', 2002)