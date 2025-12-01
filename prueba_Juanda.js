let vida = 100;
const barraJugador = document.getElementById("vida-jugador");
vidaJugador -= 20; // por ejemplo
barraJugador.style.width = vidaJugador + "%";
vidaJugador += 10;
if (vidaJugador > 100) vidaJugador = 100;
barraJugador.style.width = vidaJugador + "%";
