'use strict';

//Creación variables
let tamaño = 0, numMinas = 0, minaF = 0, minaC = 0, vivo = true, numCasillas = 0, cont = 0, intentos = 0, botonJuego = null;
let button = document.querySelector("button");
let campoMinas = document.getElementById("campoMinas");
let celda = null;
let tablero = [];
let tableroJuego = [];
let numFila = 0;
let numColumna = 0;

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
                celda.textContent = numColumna + "" + numFila;
                celda.addEventListener("click", descubrirCasilla);
                numFila++;
                if (numFila == tamaño) {
                    numFila = 0;
                    numColumna++;
                }
                campoMinas.appendChild(celda);
            }
        }
    }

    generarTableroJuego(tamaño);

    campoMinas.style.backgroundImage = "url(./img/cuadrado.png)";
    button.disabled = true;
}

function descubrirCasilla(e){
    let celdaF = e.currentTarget.textContent[0];
    let celdaC = e.currentTarget.textContent[1];
    if(tablero[celdaF][celdaC] === "*"){
        alert("¡Has perdido!");
        vivo = false;
        campoMinas.textContent = "";
        campoMinas.style.backgroundImage = "url(./img/gameover.gif)";
        campoMinas.style.backgroundSize = "cover";
        campoMinas.style.backgroundPosition = "center";
    } else {
        e.currentTarget.textContent = tablero[celdaF][celdaC];
        e.currentTarget.style.color = "white";
        e.currentTarget.style.backgroundColor = "black";
        if (tablero[celdaF][celdaC] === 0) {
            for (i = -1; i <= 1; i++) {
                if ((celda.textContent == ij) >= 0 && (celda.textContent == ij) < tamaño) {
                    for (j = -1; j <= 1; j++) {
                        if (e.currentTarget.textContent[1] + j >= 0 && e.currentTarget.textContent[1] + j < tamaño) {
                            if (tableroJuego[e.currentTarget.textContent[0] + i][e.currentTarget.textContent[1] + j] === "X") {
                                tableroJuego[e.currentTarget.textContent[0] + i][e.currentTarget.textContent[1] + j] = tablero[e.currentTarget.textContent[0] + i][e.currentTarget.textContent[1] + j];
                                cont++;
                            }
                        }
                    }
                }
            }
        }
    }
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

