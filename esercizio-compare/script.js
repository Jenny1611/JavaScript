const confronta = (a, b) => {
    if (a > b) {
        risultato.innerText = 'Il maggiore è A'
    } else if (b > a) {
        risultato.innerText = 'Il maggiore è B'
    } else {
        risultato.innerText = 'I numeri sono uguali'
    }
}

const num1 = document.getElementById('numero1')
const num2 = document.getElementById('numero2')
const modulo = document.getElementById('modulo')
const button = document.getElementById('invia')
const risultato = document.getElementById('risultato')

const eseguiConfronto = (event) => {
    event.preventDefault()
    if (controllaCampi()) {
        confronta(parseFloat(num1.value), parseFloat(num2.value))
    } else {
        risultato.innerText = 'Compila i campi!'
    }
}

modulo.addEventListener('input', eseguiConfronto)
modulo.addEventListener('submit', eseguiConfronto)

const controllaCampi = () => {
    let tuttoOk = true;
    // parseFloat(num1.value) >= 0 && parseFloat(num2.value) >= 0
    if (num1.value === '') {
        tuttoOk = false
        num1.classList.add('errore')
    } else {
        num1.classList.remove('errore')
    }

    if (num2.value === '') {
        tuttoOk = false
        num2.classList.add('errore')
    } else {
        num2.classList.remove('errore')
    }

    if (tuttoOk) {
        risultato.classList.remove('error')
    } else {
        risultato.classList.add('error')
    }

    return tuttoOk;
}