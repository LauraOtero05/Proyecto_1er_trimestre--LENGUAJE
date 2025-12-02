
/*HEADER*/

// === MOSTRAR SOLO EL OBJETO ELEGIDO EN LA PÁGINA ANTERIOR ===
document.addEventListener("DOMContentLoaded", () => {

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
        "Nidoran": "fotos/Nidoran.png",
        "Staryu": "fotos/Staryu.png",
        "Vulpix": "fotos/Vulpix.png"
    };

    const objetImages = {
        "Pocion de vida": "fotos/Pocion.png",
        "Linterna": "fotos/Linterna.png",
        "Revivir": "fotos/Revivir.png"
    };

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
            const nombre = obj.closest('.select__object').querySelector('.inventory__h1').textContent;

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
    dropdownPokemon.innerHTML = '';

    if (nombre) {
        // Crear item con el nombre del Pokémon
        const item = document.createElement('div');
        item.classList.add('dropdown__item');

        item.innerHTML = `<p class="main__text main__text--white nav__text">${nombre}</p>`; //Muestra el nombre del pokemon
        item.innerHTML = `<img src="${pokemonImages[nombre]}" alt="${nombre}"><p>${nombre}</p>`; //Muestra la imagen del pokemon

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

    // Limpiar contenido previo
    dropdownObjeto.innerHTML = '';

    if (nombre) {
        // Crear item con el objeto
        const item = document.createElement('div');
        item.classList.add('dropdown__item');

        item.innerHTML = `<p class="main__text main__text--white nav__text">${nombre}</p>`;
        item.innerHTML = `<img src="${objetImages[nombre]}" alt="${nombre}"><p>${nombre}</p>`;

        dropdownObjeto.appendChild(item);
        dropdownObjeto.classList.add('show'); // mostrar dropdown
    } else {
        // Si no hay objeto seleccionado, mantener vacío y oculto
        dropdownObjeto.classList.remove('show');
    }
    }

    document.addEventListener('DOMContentLoaded', () => {
        mostrarPokemonEnDropdown();
        mostrarObjetoEnDropdown();
    });