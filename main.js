const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let numeroAnterior = '';
let operador = '';
let bloqueado = false;

function obtenerFechaHora() {
    const ahora = new Date();

    // 👉 Sumar 60 segundos a la hora actual
    ahora.setSeconds(ahora.getSeconds() + 60);
    
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const año = ahora.getFullYear().toString();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    return parseInt(`${dia}${mes}${año}${hora}${minutos}`);
}

botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const botonApretado = boton.textContent;

        if (bloqueado && boton.id !== "igual" && boton.id !== "+/-") {
            return;
        }

        if (boton.id === "+/-") {
            if (numeroAnterior !== '' && numeroAnterior !== '0') {
                try {
                    const fechaActual = obtenerFechaHora();
                    const multiplicador = fechaActual / parseFloat(numeroAnterior);
                    pantalla.textContent = multiplicador.toFixed(8);
                    bloqueado = true;
                } catch {
                    pantalla.textContent = "error";
                }
            }
            return;
        }

        if (boton.id === "%") {
            if (numeroAnterior !== '' && numeroAnterior !== '0') {
                try {
                    const fechaActual = obtenerFechaHora();
                    const Resta = parseInt(numeroAnterior) - fechaActual;
                    pantalla.textContent = Resta
                    bloqueado = true;
                } catch {
                    pantalla.textContent = "error";
                }
            }
            return;
        }

        if (boton.id === "igual") {
            bloqueado = false;
        }

        if (boton.id === "c") {
            pantalla.textContent = "0";
            numeroAnterior = '';
            operador = '';
            bloqueado = false;
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            bloqueado = false;
            return;
        }

        if (boton.id === "igual") {
            try {
                if (numeroAnterior && operador) {
                    const resultado = eval(`${numeroAnterior} ${operador} ${pantalla.textContent}`);
                    pantalla.textContent = Math.round(resultado).toString();
                    numeroAnterior = '';
                    operador = '';
                }
            } catch {
                pantalla.textContent = "error";
            }
            return;
        }

        const esOperador = ['+', '-', '×', '÷'].includes(botonApretado);
        if (esOperador) {
            numeroAnterior = pantalla.textContent;
            switch(botonApretado) {
                case '×': operador = '*'; break;
                case '÷': operador = '/'; break;
                default: operador = botonApretado;
            }
            pantalla.textContent = "0";
            bloqueado = false;
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "error") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});
