'use strict';

//Creación variables
let tamaño = 0, numMinas = 0, minaF = 0, minaC = 0, vivo = true, numCasillas = 0, cont = 0, intentos = 0, botonJuego = null;
let button = document.querySelector("button");


function crearTablero(e){
    tamaño = parseInt(prompt("Introduce el tamaño del tablero"));
    numMinas = Math.max(1, Math.ceil((tamaño * 30) / 100));
    numCasillas = tamaño * tamaño;
    let campoMinas = document.getElementById("campoMinas");
    campoMinas.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
    campoMinas.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;

    let tablero = [];
    let tableroJuego = [];
    let numCelda = 1;

    for (let i = 0; i < tamaño; i++) {
        tablero[i] = [];
        for (let j = 0; j < tamaño; j++) {
            tablero[i][j] = 0;
        }
    }

    function generarTableroJuego(tamaño) {
        for (let i = 0; i < tamaño; i++) {
            tableroJuego[i] = [];
            for (let j = 0; j < tamaño; j++) {
                tableroJuego[i][j] = "X";
                let celda = document.createElement("div");
                celda.classList.add("grid-item");
                celda.textContent = numCelda;
                numCelda++;
                campoMinas.appendChild(celda);
            }
        }
    }

    generarTableroJuego(tamaño);
}

button.addEventListener("click", crearTablero);

