const grid = new Muuri('.grid', {
    layout: {
        rounding: false,
    },
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Se agregó los listener de los enlaces para filtrar por categoría.
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    // Se agregó el listener para la barra de búsqueda.
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //Se agregó listener para las imagenes.

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item.item img').forEach((elemento) => {

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            const pagina = elemento.parentNode.parentNode.dataset.pagina;
            const descripcion2 = elemento.parentNode.parentNode.dataset.descripcion2;
            const pagina2 = elemento.parentNode.parentNode.dataset.pagina2;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
            document.querySelector('#overlay .pagina').href = pagina;
            document.querySelector('#overlay .descripcion2').innerHTML = descripcion2;
            document.querySelector('#overlay .pagina2').href = pagina2;
        })
    });

    //Eventlistener del boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    })

    //Eventlistener del overlay
    overlay.addEventListener('click', (evento) => {

        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});