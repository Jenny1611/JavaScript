const prodotti = [
    {
        sku: 'GAME01',
        nome: 'GTA',
        prezzo: 70,
        magazzino: 100
    },
    {
        sku: 'GAME02',
        nome: 'CoD',
        prezzo: 26,
        magazzino: 50
    }
];

const qtaElement = document.getElementById('qta')
const totalElement = document.getElementById('total')

const productsList = document.getElementById('items')

const carrelloElement = document.getElementById('carrello')

let qta = 0;
const prezzo = 120;

function handleProductClick(prodotto) {

    Carrello.aggiungi(prodotto)
    qtaElement.textContent = Carrello.qta();
    totalElement.textContent = Carrello.totale();
    
    updateCartTable()
    
}

function addRow(pSku, pProdotto, pPrezzo, pQta) {
    const row = document.createElement('tr');
    const elSku = document.createElement('td');
    const elProdotto = document.createElement('td');
    const elPrezzo = document.createElement('td');
    const elQta = document.createElement('td');
    const elTotale = document.createElement('td');

    elSku.innerHTML = pSku;
    elProdotto.innerHTML = pProdotto;
    elPrezzo.innerHTML = pPrezzo;
    elQta.innerHTML = pQta;
    elTotale.innerHTML = pPrezzo * pQta;

    row.appendChild(elSku)
    row.appendChild(elProdotto)
    row.appendChild(elPrezzo)
    row.appendChild(elQta)
    row.appendChild(elTotale)

    carrelloElement.appendChild(row)
}

const Cart = () => {
    const items = [];

    return {
        oggetti: () => items,
        aggiungi: (prodotto) => {
            const posizioneElemento = items.findIndex(el => el.sku === prodotto.sku)
            // stessa cosa di: (function(el) { return el => el.sku === prodotto.sku})

            if (posizioneElemento === -1) {
                items.push({
                    ...prodotto, // spread operator
                    ... { qta: 1 }
                })
                // alternativa:
                // prodotto.qta = 1;
                // items.push(prodotto)
            } else {
                items[posizioneElemento].qta += 1;
            }
        },
        qta: () => items.length,
        totale: () => {

            return items.reduce((acc, curr) => acc + curr.qta * curr.prezzo, 0)
            // ALTERNATIVE LUNGHE:
            /* const tot = items.reduce(function(acc, item) {
                acc += item.qta * item.prezzo

                return acc;
            }, 0) */

            /* let tot = 0;
             items.forEach(function(item) {
               tot += item.qta * item.prezzo;
        })
            return tot; */

        }
    }
}

const Carrello = Cart();

function updateCartTable() {
    carrelloElement.innerHTML = '';
    Carrello.oggetti().forEach(function (item) {
        addRow(item.sku, item.nome, item.prezzo, item.qta)
    })
}

prodotti.forEach(function (item) { // item è il parametro della funzione anonima che accetta foreach
    const listItem = document.createElement('li')
    listItem.textContent = item.nome

    listItem.addEventListener('click',
        () => handleProductClick(item))

    productsList.appendChild(listItem)
})


/*
const items = document.querySelectorAll('#items li')

const itemsArray = Array.from(items)

let qta = 0;
const prezzo = 120;

qtaElement.textContent = qta;
totalElement.textContent = qta * prezzo;

function handleProductClick() {
    qta += 1;
    qtaElement.textContent = qta;
    totalElement.textContent = qta * prezzo;
}

itemsArray.forEach(function (item) {
    item.addEventListener('click',
        handleProductClick)
})*/