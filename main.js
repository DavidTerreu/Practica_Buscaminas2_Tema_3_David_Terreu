'use strict';

//Creación variables
let tamaño = 0, numMinas = 0, minaF = 0, minaC = 0, vivo = true, numCasillas = 0, cont = 0, intentos = 0;
let button = document.querySelector("button");
let campoMinas = document.getElementById("campoMinas");
let contenedorOpciones = document.getElementById("opciones");
let celda = null;
let tablero = [];
let tableroJuego = [];

do{
    button.addEventListener("click", crearTablero);

} while (vivo && cont < (numCasillas - numMinas));

function crearTablero(e){
    tamaño = parseInt(prompt("Introduce el tamaño del tablero"));
    numMinas = Math.max(1, Math.ceil((tamaño * 30) / 100));
    numCasillas = tamaño * tamaño;
    campoMinas.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
    campoMinas.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;

    for (let i = 0; i < tamaño; i++) {
        tablero[i] = [];
        for (let j = 0; j < tamaño; j++) {
            tablero[i][j] = 0;
        }
    }

    colocarMinas(numMinas);

    function generarTableroJuego(tamaño) {

        for (let i = 0; i < tamaño; i++) {
            tableroJuego[i] = [];
            for (let j = 0; j < tamaño; j++) {
                tableroJuego[i][j] = "X";
                celda = document.createElement("div");
                celda.classList.add("grid-item");
                celda.dataset.row = i;
                celda.dataset.col = j;
                celda.textContent = "";
                celda.addEventListener("click", descubrirCasilla);
                campoMinas.appendChild(celda);
            }
        }
    }

    generarTableroJuego(tamaño);

    campoMinas.style.backgroundImage = "url(./img/cuadrado.png)";
    button.remove();
}

function descubrirCasilla(e){
    let celdaF = parseInt(e.currentTarget.dataset.row);
    let celdaC = parseInt(e.currentTarget.dataset.col);

    if(tablero[celdaF][celdaC] === "*"){
        alert("¡Has perdido!");
        vivo = false;

        for (let r = 0; r < tamaño; r++) {
            for (let c = 0; c < tamaño; c++) {
                if (tablero[r][c] === "*") {
                    const cel = campoMinas.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (cel) {
                        cel.textContent = "💣";
                        cel.style.backgroundColor = "red";
                    }
                }
            }
        }

        showEndUI("lose", "¡BOOM! Has perdido", "./img/gameover.gif");
        /*contenedorOpciones.appendChild(button);
        button.addEventListener("click", crearTablero);*/
        return;
    }

    function revelar(fil, col) {
        if (fil < 0 || fil >= tamaño || col < 0 || col >= tamaño) return;
        if (tableroJuego[fil][col] !== "X") return; // ya revelada

        tableroJuego[fil][col] = tablero[fil][col];
        cont++;

        const cel = campoMinas.querySelector(`[data-row="${fil}"][data-col="${col}"]`);
        if (cel) {
            cel.textContent = tablero[fil][col] === 0 ? "" : tablero[fil][col];
            cel.style.color = "white";
            cel.style.backgroundColor = "black";
        }

        if (cont >= (numCasillas - numMinas)) {
            alert("¡Has ganado!");
            vivo = false;

            for (let r = 0; r < tamaño; r++) {
                for (let c = 0; c < tamaño; c++) {
                    if (tablero[r][c] === "*") {
                        const cel = campoMinas.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                        if (cel) {
                            cel.textContent = "💣";
                            cel.style.backgroundColor = "green";
                        }
                    }
                }
            }

            showEndUI("win", "¡Has ganado!", "./img/victoria.gif");
            return;
        }

        // si es cero, revelar vecinos recursivamente
        if (tablero[fil][col] === 0) {
        for (let recurFil = -1; recurFil <= 1; recurFil++) {
            for (let recurCol = -1; recurCol <= 1; recurCol++) {
                if (recurFil === 0 && recurCol === 0) continue;
                revelar(fil + recurFil, col + recurCol);
            }
        }
}
    }
    revelar(celdaF, celdaC);
}

function colocarMinas(numMinas) {
    for (let i = 0; i < numMinas; i++) {
        minaF = Math.floor(Math.random() * tamaño);
        minaC = Math.floor(Math.random() * tamaño);
        if (tablero[minaF][minaC] === "*") {
            i--;
        } else {
            tablero[minaF][minaC] = "*";
            for (let j = -1; j <= 1; j++) {
                if (minaF + j >= 0 && minaF + j < tamaño) {
                    for (let k = -1; k <= 1; k++) {
                        if (minaC + k >= 0 && minaC + k < tamaño) {
                            if (tablero[minaF + j][minaC + k] !== "*") {
                                tablero[minaF + j][minaC + k]++;
                            }
                        }
                    }
                }
            }
        }
    }
}

function showEndUI(type, text, gifSrc) {
    const gifDiv = document.getElementById("gif");
    // mostrar gif a la izquierda (o donde esté el div)
    gifDiv.innerHTML = `<img src="${gifSrc}" alt="${type}">`;
    // bloquear interacciones con el tablero y el botón de nuevo juego
    campoMinas.style.pointerEvents = "none";
}

