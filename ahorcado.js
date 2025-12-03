//   ELEMENTOS

const palabras = ["pokeball", "ataque", "pesadilla", "veneno", "entrenador","pokemon", "destino", "rutas", "nivel", "evolucion","tipo", "fuego", "agua", "planta", "sombra","camino", "oscuridad", "vulpix", "nidoran", "starmie"];

let palabra = "";
let oculta = [];
let vidaPokemon = 110;
let vidas = 3;

const hueco = document.getElementById("palabra");
const btnInicio = document.getElementById("reset");
const btnAcepto = document.getElementById("btn_acepto");
const dialogoContainer = document.querySelector(".dialogo_container");

//    PARA INICIAR EL JUEGO DANDOLE AL BOTON DE ACEPTAR

btnAcepto.addEventListener("click", () => {
    // Ocultar diálogo
    dialogoContainer.style.display = "none";

    // Mostrar juego
    const juego = document.getElementById("ahorcado");
    juego.classList.remove("oculto");
    juego.classList.add("mostrar");

    // Cambiar fondo
    document.body.className = "body_ahorcado";

    inicio();
});

// FUNCION PARA CUANDO INICIAS EL AHORCADO, CON TODO DESDE EL PRINCIPIO
function inicio() {
    vidas = 3;
    vidaPokemon = 110;

    actualizarVidasUI();
    actualizarBarraVida();
    generaPalabra();
    pintarGuiones();
    generaABC("a", "z");
}

//     FUNCIONES DEL JUEGO

// FUNCION PARA GENERAR UNA PALABRA RANDON DE LA CONSTANTE CREADA ARRIBA CON TODAS LAS PALABRAS QUE PUEDEN SALIR
function generaPalabra() {
    const rand = Math.floor(Math.random() * palabras.length);
    palabra = palabras[rand].toUpperCase();
}

// FUNCION PARA QUE CADA VEZ QUE EMPIECES EL AHORCADO APAREZCAS CON 3 CORAZONES
function actualizarVidasUI() {
    const contenedorVidas = document.getElementById("vidas");
    contenedorVidas.innerHTML = "";
    for (let i = 0; i < vidas; i++) {
        contenedorVidas.innerHTML += "<img src='hardcore-heart.png' alt='vida' class='icono_vida'>";
    }
}

// FUNCION PARA LOS GUINES DEL AORCADO
function pintarGuiones() {
    oculta = Array(palabra.length).fill("_");
    hueco.innerHTML = oculta.join(" ");
}

// FUNCION PARA GENERAR TODAS LAS LETRAS DEL ABECEDARIO
function generaABC(a, z) {
    const abcdario = document.getElementById("abcdario");
    abcdario.innerHTML = "";
    const iStart = a.charCodeAt(0);
    const iEnd = z.charCodeAt(0);

    for (let i = iStart; i <= iEnd; i++) {
        let letra = String.fromCharCode(i).toUpperCase();
        crearBotonLetra(letra);

        if (i === 110) { // Después de la N añadir Ñ
            crearBotonLetra("Ñ");
        }
    }
}

// FUNCION PARA QUE SE CREE EL BOTON DE LAS LETRAS
function crearBotonLetra(letra) {
    const abcdario = document.getElementById("abcdario");
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.value = letra;
    btn.classList.add("letra");
    btn.addEventListener("click", () => intentoLetra(letra));
    abcdario.appendChild(btn);
}

// FUNCION PARA CUANDO ELIGES UNA LETRA DEL CUADRO
function intentoLetra(letra) {
    const btn = document.querySelector(`button[value='${letra}']`);
    if (btn) btn.disabled = true;

    const msg = document.getElementById("acierto");

    if (palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) oculta[i] = letra;
        }
        hueco.innerHTML = oculta.join(" ");
        mostrarMensaje(msg, "¡Letra correcta!", "verde");
    } else {
        vidaPokemon = Math.max(0, vidaPokemon - 10);
        actualizarBarraVida();
        mostrarMensaje(msg, "¡Esa letra no está en la palabra!", "rojo");
    }

    compruebaFin();
}

// FUNCION PARA MOSTRAR EL MENSAJE
function mostrarMensaje(msg, texto, color) {
    msg.textContent = texto;
    msg.classList.add("acierto", color);
    setTimeout(() => {
        msg.className = "";
        msg.textContent = "";
    }, 1000);
}

// FUNCION PARA ADIVINAR LA PALABRA
function adivinarPalabra() {
    const msg = document.getElementById("acierto");
    const input = document.getElementById("input_palabra");
    if (!input) return;

    const intento = input.value.toUpperCase();
    if (!intento) return;

    if (intento === palabra) {
        oculta = palabra.split("");
        hueco.innerHTML = oculta.join(" ");
        mostrarMensaje(msg, "Bien!", "verde");
    } else {
        vidaPokemon = Math.max(0, vidaPokemon - 30);
        actualizarBarraVida();
        mostrarMensaje(msg, "Fallo!", "rojo");
    }

    input.value = "";
    compruebaFin();
}

function compruebaFin() {
    const buttons = document.querySelectorAll(".letra");
    const msgFinal = document.getElementById("msg_final");
    const inputPalabra = document.getElementById("input_palabra");
    const botonPalabra = document.getElementById("btn_palabra");

    // PALABRA ADIVINADA
    if (!oculta.includes("_")) {
        victoria();
        msgFinal.classList.add("zoom-in");
        hueco.classList.add("encuadre");

        buttons.forEach(b => b.disabled = true);
        inputPalabra.disabled = true;
        botonPalabra.disabled = true;

        return;
    }

    // PÉRDIDA DE VIDA POKÉMON
    if (vidaPokemon <= 0) {
        vidas--;
        actualizarVidasUI();

        if (vidas > 0) {
            msgFinal.textContent = "Has perdido una vida";
            msgFinal.classList.add("zoom-in");
            setTimeout(() => {
                msgFinal.textContent = "";
                msgFinal.classList.remove("zoom-in");
            }, 2000);

            vidaPokemon = 110;
            actualizarBarraVida();
            generaPalabra();
            pintarGuiones();
            generaABC("a", "z");

            inputPalabra.disabled = false;
            botonPalabra.disabled = false;
        } else {
            derrota();
        }
    }
}

// FUNCION PARA LA BARRA DE VIDA DEL AORCADO
function actualizarBarraVida() {
    const vidaMax = 110;
    const barra = document.getElementById("vidaFill");
    const texto = document.getElementById("vidaPokemon");

    const porcentaje = Math.max(0, (vidaPokemon / vidaMax) * 100);
    barra.style.width = porcentaje + "%";
    texto.textContent = `${vidaPokemon}/${vidaMax}`;
}

// FUNCION DE DERROTA
function derrota() {
    const msgFinal = document.getElementById("msg_final");
    msgFinal.textContent = "Perdiste el juego";
    msgFinal.classList.add("zoom-in");

    document.querySelectorAll(".letra").forEach(b => b.disabled = true);

    const inputPalabra = document.getElementById("input_palabra");
    const botonPalabra = document.getElementById("btn_palabra");
    inputPalabra.disabled = true;
    botonPalabra.disabled = true;

    const reintento = document.createElement("button");
    reintento.textContent = "Volver a empezar";
    reintento.id = "btn-retry";
    reintento.style.marginTop = "20px";

    reintento.addEventListener("click", () => {
        msgFinal.textContent = "";
        msgFinal.classList.remove("zoom-in");
        inicio();
        reintento.remove();
    });

    msgFinal.parentNode.appendChild(reintento);
}

// FUNCION DE VICTORIA
function victoria() {
    document.getElementById("ahorcado").classList.add("oculto");

    const victoria = document.getElementById("victoria");
    victoria.classList.remove("oculto");
    victoria.classList.add("mostrar");

    const btnRecoger = document.getElementById("btn_recoger");
    btnRecoger.disabled = false;

    btnRecoger.addEventListener("click", () => {
        mostrarRecompensa();
    });
}

// FUNCION DE MOSTRAR RECOMPENSA
function mostrarRecompensa() {
    const pocion = document.querySelector(".main_victoria_recompensa--pocion_Curacion");
    const piedra = document.querySelector(".main_victoria_recompensa--piedra_Evolutiva");
    const pokeball = document.querySelector(".main_victoria_recompensa--pokeball");
    const btnRecoger = document.getElementById("btn_recoger");

    pocion.style.display = "flex";
    piedra.style.display = "flex";

    if (Math.random() < 0.5) {
        pokeball.style.display = "flex";
    } else {
        pokeball.style.display = "none";
    }

    btnRecoger.textContent = "Avanzar";
    // Aqui cambio el comportamiento del botón para que se pueda avanzar en la historia
    btnRecoger.onclick = () => {
        // Oculta la pantalla de victoria
        document.getElementById("victoria").classList.add("oculto");
        // Apartir de aqui ponemos el siguiente paso
        // Si tienes la piedra y el pokemon correctos que evolucione si/no
        // Tendria que quedar tal que asi, solo que cambiando el nombre del html:
        window.location.href = "RutaFuego.html";
        // Si no tiene piedra y pokemon correcto, directamente a la pelea final
    }
}