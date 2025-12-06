/*MODAL*/

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    if(Math.random() < 0.4){
        document.getElementById("pokeball_agua").style.visibility = "visible";
        sessionStorage.setItem('objetoSeleccionado4', "Pokeball");
    } else {
        document.getElementById("pokeball_agua").style.visibility = "collapse";
    }
}

function entregarRecompensaAgua() {
    sessionStorage.setItem('objetoSeleccionado2', "Pocion de vida");
    sessionStorage.setItem('objetoSeleccionado5', "Piedra Agua");
}

/* RUTA AGUA */

    function goToNadar() {
    const starter = sessionStorage.getItem("pokemonSeleccionado");

    if (starter === "Vulpix") {
        location.href = "/rutaAgua/nadar.html";
    } else if (starter === "Staryu") {
        window.location.href = "/rutaAgua/nadarStaryu.html";
    } else if (starter === "Nidoran") {
        window.location.href = "/rutaAgua/nadar.html";
    } else {
        alert("Primero selecciona un Pokémon.");
    }
    }

/*HEADER*/

// === MOSTRAR SOLO EL OBJETO ELEGIDO EN LA PÁGINA ANTERIOR ===
document.addEventListener("DOMContentLoaded", () => {

    const RecogerAgua = document.getElementById("RecogerAgua");

    RecogerAgua.addEventListener("click", () => {
        entregarRecompensaAgua();
        window.location.href = "/historia/evolucion.html";
    });


    // Leer selección guardada
    const seleccionado = sessionStorage.getItem("objetoSeleccionado");

    // Ocultar todos
    document.querySelectorAll(".dropdown__item")
        .forEach(e => e.classList.remove("show"));

    // Mostrar solo el elegido
    if (seleccionado) {
        const item = document.querySelector(`.pokemon-${seleccionado}`);
        if (item) item.classList.add("show");
    }
});


// === DESPLEGABLE (abrir/cerrar con animación) ===
document.addEventListener("DOMContentLoaded", () => {

    // toggle del menú
    document.querySelectorAll('.inventory-container').forEach(container => {
        container.addEventListener('click', (e) => {
            e.stopPropagation();
            const panel = container.querySelector('.dropdown');
            if (!panel) return;

            // cerrar otros
            document.querySelectorAll('.dropdown.open')
                .forEach(p => { if (p !== panel) p.classList.remove('open'); });

            // alternar actual
            panel.classList.toggle('open');
        });
    });

    // cerrar si clicas fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown.open')
            .forEach(p => p.classList.remove('open'));
    });

    // cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.open')
                .forEach(p => p.classList.remove('open'));
        }
    });
});


/*POKEMON SELECTION AND INVENTORY*/

    //Asociar imagenes a constantes
    const pokemonImages = {
        "Nidoran": "/fotos/Nidoran.png",
        "Staryu": "/fotos/Staryu.png",
        "Vulpix": "/fotos/Vulpix.png"
    };

    const objetImages = {
        "Pocion de vida": "/fotos/Pocion.png",
        "Linterna": "/fotos/Linterna.png",
        "Revivir": "/fotos/Revivir.png",
        "Pokeball": "/fotos/Pokeball.png",
        "Piedra Fuego": "/fotos/Piedra_Fuego.png",
        "Piedra Lunar": "/fotos/PiedraLunar.png",
        "Piedra Agua": "/fotos/PiedraAgua.png"
    };

    function goToNextPage() {
    const starter = sessionStorage.getItem("pokemonSeleccionado");

    if (starter === "Vulpix") {
        window.location.href = "/combates/Combate_Vulpix.html";
    } else if (starter === "Staryu") {
        window.location.href = "/combates/Combate_Staryu.html";
    } else if (starter === "Nidoran") {
        window.location.href = "/combates/Combate_Nidoran.html";
    } else {
        alert("Primero selecciona un Pokémon.");
    }
    }

    // Para diferenciar las dos pantallas
    const pantallaPokemon = document.querySelector('.screen__PokemonSelect');
    const pantallaInventario = document.querySelector('.screen__InvenSelect');

    //Elección de la imagen de los pokemons
    const pokemons = document.querySelectorAll('.pokemon__img');

    // Cambio de pantalla al alegir el pokemon y guardado del pokemon en la pokeball
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            const nombre = pokemon.nextElementSibling.querySelector('.pokemon__h1').textContent;

            sessionStorage.setItem('pokemonSeleccionado', nombre);

            pantallaPokemon.style.display = 'none';
            pantallaInventario.style.display = 'flex';

            mostrarPokemonEnDropdown(nombre);
        });
    });
    
    //Elección de la imagen del objeto
    const objetos = document.querySelectorAll('.inventory__img');

    // Guardado del inventario en la mochila
    objetos.forEach(obj => {
        obj.addEventListener('click', () => {
            const nombre = obj.closest('.initial__object').querySelector('.inventory__h1').textContent;

            sessionStorage.setItem('objetoSeleccionado', nombre);

            mostrarObjetoEnDropdown(nombre);
        });
    });

/*ACTUALIZAR INVENTARIO Y POKEMONS*/

    function mostrarPokemonEnDropdown() {
    const pokeballNav = document.querySelectorAll('.nav')[0];
    const dropdownPokemon = pokeballNav.querySelector('.dropdown');
    const nombre = sessionStorage.getItem('pokemonSeleccionado');

    // Limpiar contenido previo
    // dropdownPokemon.innerHTML = '';

    if (nombre) {
        // Crear item con el nombre del Pokémon
        const item = document.createElement('div');
        item.classList.add('dropdown__item');

        item.innerHTML = `<img src="${pokemonImages[nombre]}" alt="${nombre}"><p class="main__text main__text--white nav__text">${nombre}</p>`;

        dropdownPokemon.appendChild(item);
        dropdownPokemon.classList.add('show'); // mostrar dropdown
    } else {
        // Si no hay pokemon seleccionado, mantener vacío y oculto
        dropdownPokemon.classList.remove('show');
    }
    }

    function mostrarObjetoEnDropdown() {
        const mochilaNav = document.querySelectorAll('.nav')[1];
        const dropdownObjeto = mochilaNav.querySelector('.dropdown--grid');
        const nombre = sessionStorage.getItem('objetoSeleccionado');
        const nombre2 = sessionStorage.getItem('objetoSeleccionado2');
        const nombre3 = sessionStorage.getItem('objetoSeleccionado3');
        const nombre4 = sessionStorage.getItem('objetoSeleccionado4');
        const nombre5 = sessionStorage.getItem('objetoSeleccionado5');
        const nombre6 = sessionStorage.getItem('objetoSeleccionado6');

        // Limpiar contenido previo
        // dropdownObjeto.innerHTML = '';

        if (nombre) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre]}" alt="${nombre}"><p class="main__text main__text--white nav__text">${nombre}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
        if (nombre2) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre2]}" alt="${nombre2}"><p class="main__text main__text--white nav__text">${nombre2}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
        if (nombre3) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre3]}" alt="${nombre3}"><p class="main__text main__text--white nav__text">${nombre3}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
        if (nombre4) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre4]}" alt="${nombre4}"><p class="main__text main__text--white nav__text">${nombre4}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
        if (nombre5) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre5]}" alt="${nombre5}"><p class="main__text main__text--white nav__text">${nombre5}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
        if (nombre6) {
            // Crear item con el objeto
            const item = document.createElement('div');
            item.classList.add('dropdown__item');

            item.innerHTML = `<img src="${objetImages[nombre6]}" alt="${nombre6}"><p class="main__text main__text--white nav__text">${nombre4}</p>`;

            dropdownObjeto.appendChild(item);
            dropdownObjeto.classList.add('show'); // mostrar dropdown
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        mostrarPokemonEnDropdown();
        mostrarObjetoEnDropdown();
    });


// ||||||| RUTA VENENO |||||||

// ELEMENTOS
const palabras = ["pokeball", "ataque", "pesadilla", "veneno", "entrenador","pokemon", "destino", "rutas", "nivel", "evolucion","tipo", "fuego", "agua", "planta", "sombra","camino", "oscuridad", "vulpix", "nidoran", "starmie"];

let palabra = "";
let oculta = [];
let vidaPokemon = 110;
let vidas = 3;

const hueco = document.getElementById("palabra");
const btnAcepto = document.getElementById("btn_acepto");
const dialogoContainer = document.querySelector(".dialogo_container");
const ahorcadoMain = document.querySelector(".ahorcado_main");
const mainVictoria = document.querySelector(".main_victoria");
const btnRecoger = document.getElementById("btn_recoger");

// INICIAR AHORCADO
btnAcepto?.addEventListener("click", () => {
    if(dialogoContainer) dialogoContainer.style.display = "none";
    inicio();
});

// INICIO DEL JUEGO
function inicio() {
    vidas = 3;
    vidaPokemon = 110;
    actualizarVidasUI();
    actualizarBarraVida();
    generaPalabra();
    pintarGuiones();
    generaABC("a", "z");

    // Resetear victoria y botones
    if(mainVictoria) {
        mainVictoria.style.display = "none";
        mainVictoria.classList.remove("mostrar");
    }
    if(btnRecoger) btnRecoger.disabled = true;

    // Mostrar ahorcado
    if(ahorcadoMain) {
        ahorcadoMain.classList.remove("oculto");
        ahorcadoMain.classList.add("mostrar");
    }
}

// GENERAR PALABRA
function generaPalabra() {
    const rand = Math.floor(Math.random() * palabras.length);
    palabra = palabras[rand].toUpperCase();
}

// ACTUALIZAR VIDAS
function actualizarVidasUI() {
    const contenedorVidas = document.getElementById("vidas");
    if (!contenedorVidas) return;
    contenedorVidas.innerHTML = "";
    for (let i = 0; i < vidas; i++) {
        contenedorVidas.innerHTML += "<img src='/fotos/hardcore-heart.png' alt='vida' class='icono_vida'>";
    }
}

// PINTAR GUIONES
function pintarGuiones() {
    oculta = Array(palabra.length).fill("_");
    if(hueco) hueco.innerHTML = oculta.join(" ");
}

// GENERAR ABC
function generaABC(a, z) {
    const abcdario = document.getElementById("abcdario");
    if(!abcdario) return;
    abcdario.innerHTML = "";
    const iStart = a.charCodeAt(0);
    const iEnd = z.charCodeAt(0);
    for (let i = iStart; i <= iEnd; i++) {
        crearBotonLetra(String.fromCharCode(i).toUpperCase());
        if(i === 110) crearBotonLetra("Ñ");
    }
}

// CREAR BOTÓN LETRA
function crearBotonLetra(letra) {
    const abcdario = document.getElementById("abcdario");
    if(!abcdario) return;
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.value = letra;
    btn.classList.add("letra");
    btn.addEventListener("click", () => intentoLetra(letra));
    abcdario.appendChild(btn);
}

// INTENTO LETRA
function intentoLetra(letra) {
    const btn = document.querySelector(`button[value='${letra}']`);
    if(btn) btn.disabled = true;
    const msg = document.getElementById("acierto");
    if(palabra.includes(letra)) {
        for(let i=0; i<palabra.length; i++){
            if(palabra[i] === letra) oculta[i] = letra;
        }
        if(hueco) hueco.innerHTML = oculta.join(" ");
        mostrarMensaje(msg, "¡Letra correcta!", "verde");
    } else {
        vidaPokemon = Math.max(0, vidaPokemon - 10);
        actualizarBarraVida();
        mostrarMensaje(msg, "¡Esa letra no está en la palabra!", "rojo");
    }
    compruebaFin();
}

// ADIVINAR PALABRA
function adivinarPalabra() {
    const msg = document.getElementById("acierto");
    const input = document.getElementById("input_palabra");
    if(!input) return;

    const intento = input.value.toUpperCase();
    if(!intento) return;

    if(intento === palabra){
        oculta = palabra.split("");
        if(hueco) hueco.innerHTML = oculta.join(" ");
        mostrarMensaje(msg, "¡Bien! Has adivinado la palabra", "verde");
        compruebaFin(true);
    } else {
        vidaPokemon = Math.max(0, vidaPokemon - 30);
        actualizarBarraVida();
        mostrarMensaje(msg, "¡Fallo!", "rojo");
        compruebaFin();
    }
    input.value = "";
}

// MOSTRAR MENSAJE
function mostrarMensaje(msg, texto, color) {
    if(!msg) return;
    msg.textContent = texto;
    msg.classList.add("acierto", color);
    setTimeout(() => { msg.className = ""; msg.textContent = ""; }, 1000);
}

// COMPROBAR FIN
function compruebaFin(adivinada = false) {
    const msgFinal = document.getElementById("msg_final");
    const inputPalabra = document.getElementById("input_palabra");
    const botonPalabra = document.getElementById("btn_palabra");

    if(adivinada || !oculta.includes("_")) {
        // Deshabilitar letras y input
        document.querySelectorAll(".letra").forEach(b => b.disabled = true);
        if(inputPalabra) inputPalabra.disabled = true;
        if(botonPalabra) botonPalabra.disabled = true;

        // Mostrar victoria
        victoriaSombrasVeneno();
        return;
    }

    // Comprobar vida
    if(vidaPokemon <= 0){
        vidas--;
        actualizarVidasUI();
        if(vidas > 0){
            if(msgFinal) msgFinal.textContent = "Has perdido una vida";
            setTimeout(() => { if(msgFinal) msgFinal.textContent = ""; }, 2000);
            vidaPokemon = 110;
            actualizarBarraVida();
            generaPalabra();
            pintarGuiones();
            generaABC("a", "z");
            if(inputPalabra) inputPalabra.disabled = false;
            if(botonPalabra) botonPalabra.disabled = false;
        } else {
            derrota();
        }
    }
}

// BARRA DE VIDA
function actualizarBarraVida() {
    const barra = document.getElementById("vidaFill");
    const texto = document.getElementById("vidaPokemon");
    const porcentaje = Math.max(0, (vidaPokemon / 110) * 100);
    if(barra) barra.style.width = porcentaje + "%";
    if(texto) texto.textContent = `${vidaPokemon}/110`;
}

// DERROTA
function derrota() {
    const msgFinal = document.getElementById("msg_final");
    if(msgFinal) msgFinal.textContent = "Perdiste el juego";
    document.querySelectorAll(".letra").forEach(b => b.disabled = true);
    const inputPalabra = document.getElementById("input_palabra");
    const botonPalabra = document.getElementById("btn_palabra");
    if(inputPalabra) inputPalabra.disabled = true;
    if(botonPalabra) botonPalabra.disabled = true;

    const reintento = document.createElement("button");
    reintento.textContent = "Volver a empezar";
    reintento.id = "btn-retry";
    reintento.style.marginTop = "20px";
    reintento.addEventListener("click", () => {
        if(msgFinal) msgFinal.textContent = "";
        inicio();
        reintento.remove();
    });
    if(msgFinal) msgFinal.parentNode.appendChild(reintento);
}

// ---------- FUNCIONES VICTORIA ----------
function victoriaSombrasVeneno() {
    // Ocultar ahorcado
    if(ahorcadoMain) {
        ahorcadoMain.classList.remove("mostrar");
        ahorcadoMain.classList.add("oculto");
    }

    // Mostrar victoria
    if(mainVictoria) {
        mainVictoria.style.display = "flex";
        mainVictoria.classList.add("mostrar");
        entregarRecompensasVeneno();
    }
}

// ---------- ENTREGA DE RECOMPENSAS ----------
function entregarRecompensasVeneno() {
    const pocion = document.querySelector(".main_victoria_recompensa--pocion_Curacion");
    const piedra = document.querySelector(".main_victoria_recompensa--piedra_Evolutiva");
    const pokeball = document.querySelector(".main_victoria_recompensa--pokeball");

    if(pocion) pocion.style.display = "flex";
    if(piedra) piedra.style.display = "flex";

    sessionStorage.setItem('objetoSeleccionado2', "Pocion de vida");
    sessionStorage.setItem('objetoSeleccionado3', "Piedra Lunar");

    if(pokeball) {
        if(Math.random() < 0.4){
            pokeball.style.display = "flex";
            localStorage.setItem("tienePokeballVeneno","true");
            sessionStorage.setItem('objetoSeleccionado4', "Pokeball");
        } else {
            pokeball.style.display = "none";
            localStorage.setItem("tienePokeballVeneno","false");
        }
    }

    // Cambiar texto a “Avanzar” y habilitar botón
    if(btnRecoger){
        btnRecoger.textContent = "Avanzar";
        btnRecoger.disabled = false;
    }
}

btnRecoger?.addEventListener("click", () => {
    entregarRecompensasVeneno();
    window.location.href = "/historia/evolucion.html";
});

// ---------- INVENTARIO ----------
localStorage.setItem("tienePocionVeneno", "true");
localStorage.setItem("tienePiedraVeneno", "true");
localStorage.setItem("tienePokeballVeneno", "true");

// |||||| RUTA FUEGO |||||||

document.addEventListener("DOMContentLoaded", () => {

    // ---------- ELEMENTOS PRINCIPALES ----------
    const btnAceptoFuego = document.getElementById("btn_aceptoFuego");
    const dialogoFuego = document.querySelector(".dialogo_containerFuego");
    const eleccionContainerFuego = document.querySelector(".main_opcionesFuego");

    // ---------- ATAQUE ----------
    const btnAtacarFuego = document.getElementById("btn_atacarFuego");
    const btnLlamaradaFuego = document.getElementById("btn_atacar--llamaradaFuego");
    const btnPlacajeFuego = document.getElementById("btn_atacar--placajeFuego");
    const btnAtacarNoFuego = document.getElementById("btn_atacar--noFuego");

    // ---------- LINTERNA ----------
    const btnLinternaFuego = document.getElementById("btn_linternaFuego");
    const btnLinternaSiFuego = document.getElementById("btn_linterna--siFuego");
    const btnLinternaNoFuego = document.getElementById("btn_linterna--noFuego");

    // ---------- HUIR ----------
    const btnHuirFuego = document.getElementById("btn_huirFuego");
    const btnHuirSiFuego = document.getElementById("btn_huir--siFuego");
    const btnHuirNoFuego = document.getElementById("btn_huir--noFuego");

    // ---------- TEXTOS ----------
    const textosFuego = document.querySelectorAll(".texto_opcionFuego");

    // ---------- VICTORIA ----------
    const victoriaFuego = document.getElementById("victoriaFuego");
    const btnRecogerFuego = document.getElementById("btn_RecogerFuego");

    // ---------- RECOMPENSAS ----------
    const pocionFuego = document.querySelector(".main_victoria_recompensa--pocion_CuracionFuego");
    const piedraFuego = document.querySelector(".main_victoria_recompensa--piedra_EvolutivaFuego");
    const pokeballFuego = document.querySelector(".main_victoria_recompensa--pokeballFuego");

    // ---------- VIDA POKÉMON ----------
    let vidaPokemonFuego = 110;

    // ---------- FUNCIONES AUXILIARES ----------
    function ocultarConfirmacionesFuego() {
        document.querySelectorAll(".confirmacion_boxFuego").forEach(box => box.style.display = "none");
    }

    function mostrarConfirmacionFuego(idBotonSI) {
        ocultarConfirmacionesFuego();
        const btnSi = document.getElementById(idBotonSI);
        if (!btnSi) return;
        const contenedor = btnSi.closest(".confirmacion_boxFuego");
        if (contenedor) contenedor.style.display = "flex";
    }

    function ocultarOpcionesFuego() {
        [btnHuirFuego, btnAtacarFuego, btnLinternaFuego].forEach(b => b.classList.add("oculto"));
        textosFuego.forEach(t => t.classList.add("oculto"));
    }

    function mostrarOpcionesFuego() {
        [btnHuirFuego, btnAtacarFuego, btnLinternaFuego].forEach(b => b.classList.remove("oculto"));
        textosFuego.forEach(t => t.classList.remove("oculto"));
    }

    function actualizarBarraVidaFuego() {
        const barra = document.getElementById("vidaFillFuego");
        const texto = document.getElementById("vidaPokemonFuego");
        barra.style.width = (vidaPokemonFuego / 110) * 100 + "%";
        texto.textContent = `${vidaPokemonFuego}/110`;
    }

    // ---------- EVENTOS ----------
    // Botón inicial Acepto
    btnAceptoFuego?.addEventListener("click", () => {
        dialogoFuego.style.display = "none";
        eleccionContainerFuego.classList.remove("oculto");
        eleccionContainerFuego.classList.add("mostrar");
    });

    // ATAQUE
    btnAtacarFuego?.addEventListener("click", () => {
        ocultarOpcionesFuego();
        mostrarConfirmacionFuego("btn_atacar--llamaradaFuego");
    });

    btnLlamaradaFuego?.addEventListener("click", () => {
        textosFuego[0].classList.remove("oculto");
        textosFuego[0].textContent = "Vulpix ataca y vence a las sombras";
        ocultarConfirmacionesFuego();
        setTimeout(victoriaSombrasFuego, 1600);
    });

    btnPlacajeFuego?.addEventListener("click", () => {
        const prob = Math.random();
        textosFuego[0].classList.remove("oculto");
        textosFuego[0].textContent = "Vulpix intenta Placaje";
        ocultarConfirmacionesFuego();
        if (prob <= 0.5) {
            textosFuego[2].classList.remove("oculto");
            textosFuego[2].textContent = "Has vencido a las sombras con éxito";
            setTimeout(victoriaSombrasFuego, 1600);
        } else {
            const perdida = vidaPokemonFuego * 0.10;
            vidaPokemonFuego = Math.max(0, vidaPokemonFuego - perdida);
            actualizarBarraVidaFuego();
            textosFuego[2].classList.remove("oculto");
            textosFuego[2].textContent = `Vulpix falla el ataque y recibe ${Math.round(perdida)} de daño`;
            setTimeout(() => {
                textosFuego[0].classList.add("oculto");
                textosFuego[2].classList.add("oculto");
                mostrarOpcionesFuego();
                ocultarConfirmacionesFuego();
            }, 1600);
        }
    });

    btnAtacarNoFuego?.addEventListener("click", () => {
        mostrarOpcionesFuego();
        ocultarConfirmacionesFuego();
    });

    // LINTERNA
    btnLinternaFuego?.addEventListener("click", () => {
        ocultarOpcionesFuego();
        mostrarConfirmacionFuego("btn_linterna--siFuego");
    });

    btnLinternaSiFuego?.addEventListener("click", () => {
        textosFuego[1].classList.remove("oculto");
        textosFuego[1].textContent = "Las sombras se disipan";
        setTimeout(victoriaSombrasFuego, 1600);
    });

    btnLinternaNoFuego?.addEventListener("click", () => {
        mostrarOpcionesFuego();
        ocultarConfirmacionesFuego();
    });

    // HUIR
    btnHuirFuego?.addEventListener("click", () => {
        ocultarOpcionesFuego();
        mostrarConfirmacionFuego("btn_huir--siFuego");
    });

    btnHuirSiFuego?.addEventListener("click", () => {
        const prob = Math.random();
        ocultarConfirmacionesFuego();
        textosFuego[2].classList.remove("oculto");
        if (prob <= 0.3) {
            textosFuego[2].textContent = "Huyes de las sombras con éxito";
            setTimeout(victoriaSombrasFuego, 1600);
        } else {
            const perdida = vidaPokemonFuego * 0.10;
            vidaPokemonFuego = Math.max(0, vidaPokemonFuego - perdida);
            actualizarBarraVidaFuego();
            textosFuego[2].textContent = `No logras huir y tu pokemon pierde ${Math.round(perdida)} de vida`;
            setTimeout(() => {
                textosFuego[2].classList.add("oculto");
                mostrarOpcionesFuego();
            }, 1600);
        }
    });

    btnHuirNoFuego?.addEventListener("click", () => {
        mostrarOpcionesFuego();
        ocultarConfirmacionesFuego();
    });

    // ---------- FUNCIONES VICTORIA ----------
    function victoriaSombrasFuego() {
        eleccionContainerFuego.classList.add("oculto");
        victoriaFuego.classList.remove("oculto");
        victoriaFuego.classList.add("mostrar");
    }

    // ---------- INVENTARIO ----------
    localStorage.setItem("tienePocionFuego", "true");
    localStorage.setItem("tienePiedraFuego", "true");
    localStorage.setItem("tienePokeballFuego", "true");

    // ---------- ENTREGA DE RECOMPENSAS ----------
    function entregarRecompensasFuego() {
        pocionFuego.style.display = "flex";
        piedraFuego.style.display = "flex";

        sessionStorage.setItem('objetoSeleccionado2', "Pocion de vida");
        sessionStorage.setItem('objetoSeleccionado6', "Piedra Fuego");

        if (Math.random() < 0.4) {
            pokeballFuego.style.display = "flex";
            localStorage.setItem("tienePokeballFuego", "true");
        } else {
            localStorage.setItem("tienePokeballFuego", "false");
        }

        btnRecogerFuego.textContent = "Avanzar";
        btnRecogerFuego.onclick = () => {
            victoriaFuego.classList.add("oculto");
            window.location.href = "/historia/evolucion.html";
        };
    }

    btnRecogerFuego?.addEventListener("click", entregarRecompensasFuego);

    // ---------- INICIAL ----------
    ocultarConfirmacionesFuego();
});


//JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA JUANDA//


// -------------------------------
// VARIABLES DE VIDA
// -------------------------------
let playerHP = 100;
let enemyHP = 100;

// Para bloquear el ataque fuerte si se usó antes
let lastMove = null;

// -------------------------------
// ACTUALIZAR BARRAS
// -------------------------------
function updateBars() {
    document.getElementById("life_player").style.width = playerHP + "%";
    document.getElementById("life_enemy").style.width = enemyHP + "%";

    if (enemyHP <= 0) {
        window.location.href = "/finales/final_Neutral.html"; 
    }

    if (playerHP <= 0) {
        window.location.href = "/finales/BadEnding.html";
    }
}

// -------------------------------
// ATAQUE DEL ENEMIGO
// -------------------------------
function enemyAttack() {
    const dmg = Math.floor(Math.random() * 10) + 3;
    playerHP -= dmg;
    console.log("El enemigo te hace " + dmg + " de daño");
    updateBars();
}

// -------------------------------
// ACCIONES DEL JUGADOR
// -------------------------------

// A1 – Ataque normal
document.querySelector(".a1").addEventListener("click", () => {
    const dmg = Math.floor(Math.random() * 10) + 5;
    enemyHP -= dmg;
    console.log("Usas ataque normal y haces " + dmg + " de daño");
    lastMove = "a1";
    updateBars();
    setTimeout(enemyAttack, 100);
});

// A2 – Ataque medio
document.querySelector(".a2").addEventListener("click", () => {
    const dmg = Math.floor(Math.random() * 14) + 8;
    enemyHP -= dmg;
    console.log("Ataque medio | Daño: " + dmg);
    lastMove = "a2";
    updateBars();
    setTimeout(enemyAttack, 100);
});



function usarPokeball() {

    const resultado = Math.floor(Math.random() * 10) + 1;

    if (resultado === 1) {
        // 👉 CAMBIA esta ruta por la que quieras
        window.location.href = "/finales/Goodending.html";
    } else {
        msgcombate.classList.add("mostrar");
    msgcombate.classList.remove("oculto");
    msgcombate.textContent = "La Pokeball Fallo";

    }
}


// A3 – Ataque fuerte (no se puede repetir 2 turnos seguidos)
document.querySelector(".a3").addEventListener("click", () => {

    // ⭐ Si el jugador tiene Pokéball → se usa y NO ejecutamos nada más

        usarPokeball();



    // Después de un tiempo, podrías devolver el turno al jugador
    setTimeout(() => {
        turnoJugador = true;
        desbloquearBotones();
    }, 5000);
});



// A4 – Huir (recibes daño, no puedes huir)
const btnHuir = document.querySelector(".a4");
const msgcombate = document.getElementById("msg_combate");

document.querySelector(".a4").addEventListener("click", () => {
    msgcombate.classList.add("mostrar");
    msgcombate.classList.remove("oculto");
    msgcombate.textContent = "No puedes huir y Darkrai te ataca";
    setTimeout(() => {
        msgcombate.classList.remove("mostrar");
    msgcombate.classList.add("oculto");
    }, 5000);

    const dmg = 40;
    playerHP -= dmg;
    console.log("No puedes huir | Recibes " + dmg + " de daño");
    lastMove = "a4"; 
    updateBars();
});