
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
