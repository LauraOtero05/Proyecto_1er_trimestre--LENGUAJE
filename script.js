
/*HEADER*/

// === MOSTRAR SOLO EL OBJETO ELEGIDO EN LA PÁGINA ANTERIOR ===
document.addEventListener("DOMContentLoaded", () => {

    // Leer selección guardada
    const seleccionado = localStorage.getItem("objetoSeleccionado");

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

    // Para diferenciar las dos pantallas
    const pantallaPokemon = document.querySelector('.pantalla__selecPokemon');
    const pantallaInventario = document.querySelector('.pantalla__selecInvent');

    //Elección de la imagen de los pokemons
    const pokemons = document.querySelectorAll('.box__selecPokemon__img');

    // Cambio de pantalla al alegir el pokemon
    pokemons.forEach(pokemon => {
    pokemon.addEventListener('click', () => {
        event.preventDefault();
        pantallaPokemon.style.display = 'none';
        pantallaInventario.style.display = 'flex';
    });
    });

