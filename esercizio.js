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

const casa1 = Casa('Via JavaScript, 6', 2, 100)

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

    return {
        nome,
        annoDiNascita,
        saluta: () => {
            let anni = (new Date()).getFullYear() - annoDiNascita
            // return 'Ciao sono ' + nome + ', ho ' + anni + ' anni'
            return `Ciao sono ${nome}, ho ${anni} anni`
        }
    }
}

const inquilino1 = Inquilino('Giulio', 2002)

/*
Esercizio 4
Aggiungere a casa1, senza modificare la funzione FnCasa, i metodi:
 - metodo aggiungiInquilino(inq)
 - metodo elencoInquilini()
 - metodo rimuovi inquilino(nomeInquilino)
 */

 casa1.inquilini = []

 casa1.elencoInquilini = function() { // non si può usare la arrow function perché perde il 'this'
    return this.inquilini // this per accedere alle caratteristiche di sè stesso
 }

 casa1.aggiungiInquilino = function(inq) {
    this.inquilini.push(inq)
 }

 casa1.rimuoviInquilinoInsensitive = function(nomeInq) {
    const idx = this.inquilini.findIndex((inq) => {
        return inq.nome.toLowerCase() === nomeInq.toLowerCase()
    }) 

    if (idx >= 0) {
        this.inquilini.splice(idx, 1)
    }
 }