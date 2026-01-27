const inputBusqueda = document.getElementById("inputBusqueda");
const btnBusqueda = document.getElementById("btnBusqueda");

const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");
const textoBusquedaURL = params.get("q"); 

let todosLosProductos = [];

fetch("/static/data/totes_lista.json")
  .then(res => res.json())
  .then(productos => {
    todosLosProductos = productos;
    aplicarFiltros();
  })
  .catch(err => console.error("Error cargando productos", err));

function aplicarFiltros() {
  if (!todosLosProductos.length) return;

  let lista = [...todosLosProductos];
  let busqueda = inputBusqueda?.value.trim().toLowerCase() || textoBusquedaURL?.toLowerCase();


  if (busqueda) {
    lista = lista.filter(p =>
      p.titulo.toLowerCase().includes(busqueda) ||
      p.descripcion.toLowerCase().includes(busqueda) ||
      p.categoria.toLowerCase().includes(busqueda)
    );
  }
  else if (categoria) {
    lista = lista.filter(p => p.categoria === categoria);
  }

  actualizarTitulo(busqueda, categoria);
  renderizarProductos(lista);
}


if (btnBusqueda && inputBusqueda) {
  btnBusqueda.addEventListener("click", e => {
    e.preventDefault();
    const texto = inputBusqueda.value.trim();
    if (texto !== "") {
      window.location.href = `/tote?q=${encodeURIComponent(texto)}`;
    }
  });

  inputBusqueda.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const texto = inputBusqueda.value.trim();
      if (texto !== "") {
        window.location.href = `/tote?q=${encodeURIComponent(texto)}`;
      }
    }
  });
}

function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return; 

  contenedor.innerHTML = "";

  if (!lista.length) {
    contenedor.innerHTML = `
      <p class="text-center text-muted mt-5 fs-5">
        No se encontraron productos 😕
      </p>
    `;
    return;
  }

  lista.forEach(tote => {
    contenedor.innerHTML += `
      <div class="col mb-3">
        <div class="card h-100">
          <img src="/static/${tote.imagen}" class="card-img-top"
               alt="${tote.titulo}" style="object-fit: cover; height: 470px;">
          <div class="card-body">
            <h5>${tote.titulo}</h5>
            <p>${tote.descripcion}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <strong>$${tote.precio}</strong>
            <input type="number" class="form-control me-2 input-cantidad"
                   value="1" min="1" max="10" step="1" style="width: 90px;">
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
    `;
  });

  contenedor.querySelectorAll(".input-cantidad").forEach(input => {
    input.addEventListener("input", () => {
      if (!input.value) return;
      let val = parseInt(input.value);
      if (val < 1) input.value = 1;
      if (val > 10) input.value = 10;
    });
  });
}


function actualizarTitulo(busqueda, categoria) {
  const titulo = document.getElementById("titulo-categoria");
  if (!titulo) return;

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

  if (busqueda) {
    titulo.textContent = `Resultados para "${busqueda}"`;
  } else if (categoria) {
    titulo.textContent = nombres[categoria] || categoria;
  } else {
    titulo.textContent = "Todas las Totes";
  }
}
