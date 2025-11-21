
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

Math.random