const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

fetch("/static/data/totes_lista.json")
  .then(res => res.json())
  .then(productos => {

    const filtrados = categoria
      ? productos.filter(p => p.categoria === categoria)
      : productos;

    renderizarProductos(filtrados);
    actualizarTitulo(categoria);
  });

function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <p class="text-center text-muted mt-5 fs-5">
        Próximamente nuevos diseños 👀✨
      </p>
    `;
    return;
  }

  lista.forEach(tote => {
    contenedor.innerHTML += `
      <div class="col mb-3">
        <div class="card h-100">
          <img src="/static/${tote.imagen}" class="card-img-top"
               alt="${tote.titulo}"
               style="object-fit: cover; height: 470px;">
          
          <div class="card-body">
            <h5 class="card-title">${tote.titulo}</h5>
            <p class="card-text">${tote.descripcion}</p>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <strong class="fs-4">$${tote.precio}</strong>

            <div class="d-flex align-items-center">
            <input 
             type="number"
             class="form-control me-2 input-cantidad"
             value="1"
             min="1"
             max="10"
             step="1"
             oninput="
             if (this.value < 1) this.value = 1;
             if (this.value > 10) this.value = 10;
              "
             style="width: 90px;"
             >
              <button class="btn btn-dark btn-agregar-carrito"
                data-id="${tote.id}"
                data-titulo="${tote.titulo}"
                data-precio="${tote.precio}"
                data-imagen="${tote.imagen}">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function actualizarTitulo(categoria) {
  const titulo = document.getElementById("titulo-categoria");

  const nombres = {
    promo: "Promo",
    arg: "Argentina",
    anime: "Anime",
    disenio: "+ Diseños",
    universitario: "Universitario",
    taylor: "Taylor Swift",
    bandas: "Bandas & Artistas",
    rpg: "D&D"
  };

  titulo.textContent = categoria
    ? nombres[categoria] || categoria
    : "Todas las Totes";
}

