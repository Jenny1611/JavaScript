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

function updateCartTable() {
    carrelloElement.innerHTML = '';
    Carrello.oggetti().forEach(function (item) {
        addRow(item.sku, item.nome, item.prezzo, item.qta)
    })
}

function handleProductClick(prodotto) {

    Carrello.aggiungi(prodotto)
    qtaElement.textContent = Carrello.qta();
    totalElement.textContent = Carrello.totale();

    updateCartTable()
    updateProductsList()
}

// MAIN //
const prodotti = [
    {
        sku: 'GAME01',
        nome: 'Grand Theft Auto',
        prezzo: 70,
        magazzino: 100
    },
    {
        sku: 'GAME02',
        nome: 'Call of Duty',
        prezzo: 26,
        magazzino: 50
    },
    {
        sku: 'GAME03',
        nome: 'Fifa 23',
        prezzo: 26,
        magazzino: 50
    },
    {
        sku: 'GAME04',
        nome: 'Ghost and Goblins',
        prezzo: 26,
        magazzino: 50
    },
    {
        sku: 'GAME05',
        nome: 'Xonotic',
        prezzo: 26,
        magazzino: 50
    },
    {
        sku: 'GAME06',
        nome: 'The Sims 4',
        prezzo: 26,
        magazzino: 50
    },
    {
        sku: 'GAME07',
        nome: 'Unreal Tournament 2004',
        prezzo: 26,
        magazzino: 50
    }
];



const updateProductsList = (cercato) => {
    productsList.innerHTML = ''

    prodotti
        .filter((p) => !cercato || p.nome.toLowerCase().indexOf(cercato.toLowerCase()) >= 0)
        .forEach(function (item) {
            const listItem = document.createElement('li');

            // listItem.innerHTML = item.nome + ' <b>' + item.prezzo + '€</b>';
            listItem.innerHTML = `${item.nome}<b>${item.prezzo}€</b>`;

            if (Carrello.oggetti().findIndex((i) => item.sku === i.sku) >= 0) {
                listItem.className = 'added'
            }

            listItem.addEventListener(
                'click',
                () => handleProductClick(item)
            )

            productsList.appendChild(listItem)
        })
}

let qtaElement;
let totalElement;

let productsList;

let carrelloElement;

let searchField;

let qta = 0;
const prezzo = 120;
let Carrello;

document.addEventListener('DOMContentLoaded', () => {

    qtaElement = document.getElementById('qta')
    totalElement = document.getElementById('total')

    productsList = document.getElementById('items')

    carrelloElement = document.getElementById('carrello')

    searchField = document.getElementById('cerca')

    Carrello = Cart();

    updateProductsList()


    searchField.addEventListener(
        'input',
        (event) => {
            const valoreCercato = event.target.value
            updateProductsList(valoreCercato)
        })
})