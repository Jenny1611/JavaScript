const lista = document.getElementById('items')
const quantità = document.getElementById('qta')
const totale = document.getElementById('total')

const prodotti = [
    {
        nome: 'primo prodotto'
    },
    {
        nome: 'secondo prodotto'
    }
]

prodotti.forEach(function (item) {
    const product = document.createElement('li')
    product.innerHTML = `${item.nome}`
    lista.appendChild(product)
    product.addEventListener('click', (event) =>
        alert('Hai cliccato su ' + event.target.innerHTML))
})

quantità.innerText = '10'
totale.innerText = '20'

/*
const lis = document.getElementsByTagName('li')
Array.from(lis).forEach((element) => {
    element.addEventListener('click', (event) =>
        alert('Hai cliccato su ' + event.target.innerHTML))
})*/