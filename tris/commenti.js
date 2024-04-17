const divs = document.querySelectorAll('div div') // crea un elenco di nodi cercando nel documento tutti div figli di div
        let currentPlayer = 1; // variabile che imposta il valore del giocatore a 1 (poi si scambia con 2)
        let playing = true; // variabile per definire se si gioca o no impostata come vera

        let counter1 = 0; // variabile per il conteggio dei punti del giocatore 1
        let counter2 = 0; // variabile per il conteggio dei punti del giocatore 2

        const updateCounters = () => { /* funzione che cerca nel documento le sezioni della tabella per salvare i punti
        dei giocatori */
            const counter1Element = document.getElementById('counter-1') // cerca un elemento nel documento con id 'counter-1'
            const counter2Element = document.getElementById('counter-2') // cerca un elemento nel documento con id 'counter-2'

            counter1Element.innerText = counter1; // imposta il valore dell'elemento cercato con la variabile counter1 definita all'inizio
            counter2Element.innerText = counter2; // imposta il valore dell'elemento cercato con la variabile counter2 definita all'inizio
        }

        const wins = [ // array di array con le 8 possibili soluzioni del gioco
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        const board = [ // array della tavola da gioco impostata a 0 perché all'inizio del gioco è vuota (senza classi)
            0,0,0,
            0,0,0,
            0,0,0
        ];

        const coloraBox = () => { // funzione che colora il box con la classe del giocatore che l'ha cliccato
            board.forEach((elemento, idx) => { /* per ogni elemento della tavola da gioco cerca nel documento l'elemento con
            id progressivo partendo da 0 */
                const box = document.getElementById(idx)

                if (box) { 
                    if(elemento !== 0) { /* se l'elemento esiste e se l'elemento dell'array corrisponde a 0, imposta la classe
                    dell'elemento con la classe del giocatore che ha cliccato il box */
                        box.className = 'player-' + elemento;
                    } else { /* se l'elemento esiste ma la condizione di prima non è stata rispettata, reimposta la classe
                    dell'elemento come vuota (usato per il resetBoard()) */
                        box.className = '';
                    }
                }
            })
        }

        const resetBoard = () => { // funzione che resetta i colori e i valori della tabella del tris
            board.fill(0); // riempie l'array di zeri
            coloraBox(); /* richiama la funzione coloraBox() e ricolora le celle (toglie le classi perché tutti gli elementi 
            dell'array sono a 0) */
            playing = true; // reimposta la variabile per definire se si gioca o no come vera per ricominciare il gioco
        }

        const checkWinner = () => { // funzione che controlla se qualcuno ha vinto e chi
            coloraBox(); // chiama la funzione che colora i box

            const winningState = wins.find(function(sitWin) { /* per ogni elemento dell'array wins imposta come
            costanti i valori delle posizioni dell'array delle possibili vittorie da controllare, poi assegna a dei valori costanti
            il valore della possibile vittoria, infine verifica che i valori delle posizioni nell'array della tabella
            di gioco siano uguali confrontandole con le possibili soluzioni */
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

            if (winningState !== undefined) { /* se lo stato della vittoria è diverso da undefined cerca nel documento
            gli elementi con gli id corrispondenti alle posizioni dell'array della tabella di gioco e applica la classe
            della vittoria che colora i box di rosso */
                const box1 = document.getElementById(winningState[0]);
                const box2 = document.getElementById(winningState[1]);
                const box3 = document.getElementById(winningState[2]);

                box1.className = 'win';
                box2.className = 'win';
                box3.className = 'win';

                const winningPlayer = board[winningState[0]]; /* cerca all'interno della tabella di gioco il valore (1 0 2)
                del giocatore che ha vinto */

                if (winningPlayer === 1) { // se il giocatore che ha vinto è il primo aumenta il punteggio di 1
                    counter1++;
                } else { // se il giocatore che ha vinto è il primo aumenta il punteggio di 2
                    counter2++;
                }

                updateCounters(); // richiama la funzione per aggiornare i punteggi nella tabella
                
                playing = false; /* setta la variabile per definire se si gioca o no come falsa e si ferma il 
                gioco (non si può più cliccare) */

                alert('Un giocatore ha vinto') // si apre l'alert del browser che informa che qualcuno ha vinto
            }
        }

        divs.forEach(el => { // per ogni div della lista di nodi aggiunge un listener di eventi, click come evento e fa cose
            el.addEventListener('click', (event) => {
                event.stopPropagation(); // ferma la propagazione dell'evento ai suoi genitori con altri eventlistener
                /*if (event.target.className === '') {
                    event.target.className = `player-${isPlayer1 ? '1' : '2'}`
                    isPlayer1 = !isPlayer1;

                    checkWinner();
                }*/

                if (playing) { // se 'si gioca' è vero permette di cliccare i blocchi
                    const posizione = parseInt(event.target.id); // fa il casting dell'id delle celle da stringa a intero

                    if (board[posizione] === 0) { /* se il valore del blocco cliccato nella tabella di gioco è ancora 0 
                    permette di impostare il valore di questo blocco con il numero del giocatore che ha cliccato (1 o 2) */
                        board[posizione] = currentPlayer;
                    }

                    checkWinner(); // richiama la funzione per controllare se qualcuno ha vinto e chi

                    currentPlayer = currentPlayer === 1 ? 2 : 1; /* scambia il valore del giocatore corrente da 1 a 2 e
                    viceversa dopo ogni click */
                }
            })
        })