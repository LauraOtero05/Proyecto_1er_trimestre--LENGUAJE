
// El DOM es para poder acceder a los elementos y poder modificarlos (no me dejaba con otra cosa)
document.addEventListener("DOMContentLoaded", () => {

    // TODOS LOS ELEMENTOS UTILIZADOS EN ESTA RUTA
    const btnAcepto = document.getElementById("btn_acepto");
    const dialogoFuego = document.querySelector(".dialogo_container");
    const eleccionContainer = document.querySelector(".eleccion_container");
    // Apartado ataque
    const btnAtacar = document.getElementById("btn_atacar");
    const btnLlamarada = document.getElementById("btn_atacar--llamarada");
    const btnPlacaje = document.getElementById("btn_atacar--placaje");
    const btnAtacarNo = document.getElementById("btn_atacar--no");
    // Apartado linterna
    const btnLinterna = document.getElementById("btn_linterna");
    const btnLinternaSi = document.getElementById("btn_linterna--si");
    const btnLinternaNo = document.getElementById("btn_linterna--no");
    // Apartado huida
    const btnHuir = document.getElementById("btn_huir");
    const btnHuirSi = document.getElementById("btn_huir--si");
    const btnHuirNo = document.getElementById("btn_huir--no");
    // Textos
    const textos = document.querySelectorAll(".texto_opcion");
    // Victoria
    const victoria = document.getElementById("victoria");
    const btnRecoger = document.getElementById("btn_Recoger");
    // Objetos
    const pocion = document.querySelector(".main_victoria_recompensa--pocion_Curacion");
    const piedra = document.querySelector(".main_victoria_recompensa--piedra_Evolutiva");
    const pokeball = document.querySelector(".main_victoria_recompensa--pokeball");
    // Vida del Pokémon
    let vidaPokemon = 110;

    // FUNCIONES DE AYUDA
    function ocultarConfirmaciones() {
        document.querySelectorAll(".confirmacion_box").forEach(box => box.style.display = "none");
    }

    function mostrarConfirmacion(idBotonSI) {
        ocultarConfirmaciones();
        const btnSi = document.getElementById(idBotonSI);
        if (!btnSi) return;
        const contenedor = btnSi.closest(".confirmacion_box");
        if (contenedor) contenedor.style.display = "flex";
    }

    function ocultarTodo() {
        [btnHuir, btnAtacar, btnLinterna].forEach(b => b.classList.add("oculto"));
        textos.forEach(t => t.classList.add("oculto"));
    }

    function mostrarTodo() {
        [btnHuir, btnAtacar, btnLinterna].forEach(b => b.classList.remove("oculto"));
        textos.forEach(t => t.classList.remove("oculto"));
    }

    function actualizarBarraVida() {
        const barra = document.getElementById("vidaFill");
        const texto = document.getElementById("vidaPokemon");
        barra.style.width = (vidaPokemon / 110) * 100 + "%";
        texto.textContent = `${vidaPokemon}/110`;
    }

    // Botón inicial para aceptar
    btnAcepto?.addEventListener("click", () => {
        dialogoFuego.style.display = "none";
        eleccionContainer.classList.remove("oculto");
        eleccionContainer.classList.add("mostrar");
    });

    // Esto para atacar
    btnAtacar?.addEventListener("click", () => {
        ocultarTodo();
        mostrarConfirmacion("btn_atacar--llamarada");
    });

    btnLlamarada?.addEventListener("click", () => {
        textos[0].classList.remove("oculto");
        textos[0].textContent = "Vulpix ataca y vence a las sombras";
        ocultarConfirmaciones();
        setTimeout(victoriaSombras, 1600);
    });
    btnPlacaje?.addEventListener("click", () => {
        const prob = Math.random();
        textos[0].classList.remove("oculto");
        textos[0].textContent = "Vulpix intenta Placaje";
        ocultarConfirmaciones();
        if (prob <= 0.5) {
            textos[2].classList.remove("oculto");
            textos[2].textContent = "Has vencido a las sombras con éxito";
            setTimeout(victoriaSombras, 1600); 
            //AQUI QUE LLEVE AL APARTADO DE EVOLUCION
        } else {
            const perdida = vidaPokemon * 0.10;
            vidaPokemon = Math.max(0, vidaPokemon - perdida);
            actualizarBarraVida();
            textos[2].classList.remove("oculto");
            textos[2].textContent = `Vulpix falla el ataque y recibe ${Math.round(perdida)} de daño`;
            setTimeout(() => {
                textos[0].classList.add("oculto");
                textos[2].classList.add("oculto");
                mostrarTodo();
                ocultarConfirmaciones();
            }, 1600);
        }
    });
    btnAtacarNo?.addEventListener("click", () => {
        mostrarTodo();
        ocultarConfirmaciones();
    });

    // Esto para linterna
    btnLinterna?.addEventListener("click", () => {
        ocultarTodo();
        mostrarConfirmacion("btn_linterna--si");
    });

    btnLinternaSi?.addEventListener("click", () => {
        textos[1].classList.remove("oculto");
        textos[1].textContent = "Las sombras se disipan";
        setTimeout(victoriaSombras, 1600); 
        //AQUI QUE LLEVE AL APARTADO DE EVOLUCION
    });
    btnLinternaNo?.addEventListener("click", () => {
        mostrarTodo();
        ocultarConfirmaciones();
    });

    // Esto es para huir
    btnHuir?.addEventListener("click", () => {
        ocultarTodo();
        mostrarConfirmacion("btn_huir--si");
    });

    btnHuirSi?.addEventListener("click", () => {
        const prob = Math.random();
        ocultarConfirmaciones();
        textos[2].classList.remove("oculto");
        if (prob <= 0.3) {
            textos[2].textContent = "Huyes de las sombras con éxito";
            setTimeout(victoriaSombras, 1600); 
            //AQUI QUE LLEVE AL APARTADO DE EVOLUCION
        } else {
            const perdida = vidaPokemon * 0.10;
            vidaPokemon = Math.max(0, vidaPokemon - perdida);
            actualizarBarraVida();
            textos[2].textContent = `No logras huir y tu pokemon pierde ${Math.round(perdida)} de vida`;
            setTimeout(() => {
                textos[2].classList.add("oculto");
                mostrarTodo();
            }, 1600);
        }
    });
    btnHuirNo?.addEventListener("click", () => {
        mostrarTodo();
        ocultarConfirmaciones();
    });

    // Aqui las recompensas
    // FUNCIÓN DE VICTORIA
    function victoriaSombras() {
        eleccionContainer.classList.add("oculto");
        victoria.classList.remove("oculto");
        victoria.classList.add("mostrar");
    }

    // INVENTARIO
    localStorage.setItem("tienePocion", "true");
    localStorage.setItem("tienePiedraFuego", "true");
    localStorage.setItem("tienePokeball", "true");

    // FUNCION DE ENTREGA DE RECOMPENSA
    function entregarRecompensas() {
        pocion.style.display = "flex";
        piedra.style.display = "flex";
        localStorage.setItem("tienePocion", "true");
        localStorage.setItem("tienePiedraFuego", "true");

        // Pokéball con 50% probabilidad de drop
        if (Math.random() < 0.4) {
            pokeball.style.display = "flex";
            localStorage.setItem("tienePokeball", "true");
        } else {
            localStorage.setItem("tienePokeball", "false");
        }

        btnRecoger.textContent = "Avanzar";
        // Aqui cambio el comportamiento del botón para que se pueda avanzar en la historia
        btnRecoger.onclick = () => {
            // Oculta la pantalla de victoria
            document.getElementById("victoria").classList.add("oculto");
            // Apartir de aqui ponemos el siguiente paso
            // Si tienes la piedra y el pokemon correctos que evolucione si/no
            // Tendria que quedar tal que asi, solo que cambiando el nombre del html:
            window.location.href = "RutaVeneno.html";
            // Si no tiene piedra y pokemon correcto, directamente a la pelea final
        }
    }

     btnRecoger?.addEventListener("click", entregarRecompensas);

    ocultarConfirmaciones();
});
