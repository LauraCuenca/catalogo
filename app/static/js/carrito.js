import { actualizarContador } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('carrito-container');
  const totalPrecioSpan = document.getElementById('total-precio');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  const btnWhatsApp = document.getElementById('btnEnviarWhatsApp');
  const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  const btnConfirmarVaciar = document.getElementById("confirmarVaciarCarrito");
  const btnConfirmarEliminar = document.getElementById("confirmarEliminarProducto");

  let indexProductoAEliminar = null;

  if (!container || !totalPrecioSpan) return;

  mostrarCarrito();

  function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    container.innerHTML = '';

    if (carrito.length === 0) {
      mensajeVacio.style.display = 'block';
      totalPrecioSpan.textContent = '$0';
      btnVaciarCarrito.style.display = "none";
      return;
    } else {
      mensajeVacio.style.display = 'none';
      btnVaciarCarrito.style.display = "inline-block";
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const cantidad = producto.cantidad || 1;
      const subtotal = producto.precio * cantidad;
      total += subtotal;

      const card = document.createElement('div');
      card.classList.add('col');
      card.innerHTML = `
        <div class="card h-100 d-flex flex-row align-items-center p-2">
          <img 
            src="/static/${producto.imagen}" 
            alt="${producto.titulo}" 
            style="width:150px;height:150px;object-fit:cover;border-radius:5px;margin-right:15px;"
          >
          <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p>Precio unitario: $${producto.precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Subtotal: $${subtotal.toFixed(0)}</p>

            <button
              class="btn btn-danger btn-sm btn-eliminar"
              data-index="${index}"
              data-titulo="${producto.titulo}"
              data-bs-toggle="modal"
              data-bs-target="#modalEliminarProducto"
            >
              Eliminar
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    totalPrecioSpan.textContent = `$${total.toFixed(0)}`;

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        indexProductoAEliminar = parseInt(e.target.dataset.index);
        const titulo = e.target.dataset.titulo;

        document.getElementById("textoEliminarProducto").textContent =
          `¿Seguro que querés eliminar "${titulo}" del carrito?`;
      });
    });
  }

  function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
  }

  if (btnConfirmarEliminar) {
    btnConfirmarEliminar.addEventListener("click", () => {
      if (indexProductoAEliminar === null) return;

      eliminarDelCarrito(indexProductoAEliminar);
      indexProductoAEliminar = null;

      const modal = bootstrap.Modal.getInstance(
        document.getElementById('modalEliminarProducto')
      );
      modal.hide();
    });
  }

  btnConfirmarVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContador();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('modalVaciarCarrito')
    );
    modal.hide();
  });


  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', function () {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      if (carrito.length === 0) return alert("Tu carrito está vacío.");

      let mensaje = "Hola, quiero hacer este pedido:\n\n";
      carrito.forEach(item => {
        mensaje += `${item.titulo} - Cantidad: ${item.cantidad || 1} - Precio: $${item.precio}\n`;
      });

      const total = carrito.reduce((acc, i) => acc + i.precio * (i.cantidad || 1), 0);
      mensaje += `\nTotal: $${total.toFixed(0)}`;

      window.open(`https://wa.me/542213631353?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
  }
});
