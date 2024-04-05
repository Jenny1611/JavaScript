const FnAutomobili = (ruote, nome, alimentazione, id, passeggeri) => {
    return {
        ruote,
        nome,
        alimentazione,
        id,
        suono: () => 'beep',
        numeroPasseggeri: () => passeggeri,
        incrementaPass: () => {
            passeggeri += 1
        },
        decrementaPass: () => passeggeri > 0 ? passeggeri -= 1 : passeggeri
    }
}

/*console.log(auto1.numeroPasseggeri())
console.log(auto1.incrementaPass())
console.log(auto1.id)*/

const auto1 = FnAutomobili(4, 'Fiat Panda', 'Benzina', 'FP01', 1)
const auto2 = FnAutomobili(4, 'Seat Leon', 'Diesel', 'SL01', 1)

const FnConcessionaria = () => {
    const mezzi = []

    return {
        numeroMezzi: () => mezzi.length,
        aggiungiMezzo: (auto) => mezzi.push(auto),
        esisteMezzo: (idCercato) => {
            const posizioneAuto = mezzi.findIndex((m) => m.id === idCercato)
            return posizioneAuto === -1 ? 'No' : 'Si'
            // oppure return posizioneAuto >= 0 ritorna true o false
        }
    }
}

const Concessionaria = FnConcessionaria()

console.log(Concessionaria.numeroMezzi())
console.log(Concessionaria.aggiungiMezzo(auto1))
console.log(Concessionaria.aggiungiMezzo(auto2))
console.log(Concessionaria.esisteMezzo('FP01'))
console.log(Concessionaria.esisteMezzo('FP02'))
console.log(Concessionaria.esisteMezzo('SL01'))