import { actualizarContador } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('carrito-container');
  const totalPrecioSpan = document.getElementById('total-precio');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  const btnWhatsApp = document.getElementById('btnEnviarWhatsApp'); // botón en HTML

  if (!container || !totalPrecioSpan) {
    return;
  }

  mostrarCarrito();

  function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    container.innerHTML = '';

    if (carrito.length === 0) {
      mensajeVacio.style.display = 'block';
      totalPrecioSpan.textContent = '$0';
      return;
    } else {
      mensajeVacio.style.display = 'none';
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
           style="width: 150px; height: 150px; object-fit: cover; border-radius: 5px; margin-right: 15px;"
          >
          <div class="card-body p-0 flex-grow-1">
            <div class="card-body">
              <h5 class="card-title">${producto.titulo}</h5>
              <p class="card-text">Precio unitario: $${producto.precio}</p>
              <p class="card-text">Cantidad: ${cantidad}</p>
              <p class="card-text">Subtotal: $${subtotal.toFixed(0)}</p>
              <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    totalPrecioSpan.textContent = `$${total.toFixed(0)}`;

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        eliminarDelCarrito(index);
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

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', function () {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      let mensaje = "Hola, quiero hacer este pedido:\n\n";
      carrito.forEach(item => {
        const cantidad = item.cantidad || 1;
        mensaje += `${item.titulo} - Cantidad: ${cantidad} - Precio: $${item.precio}\n`;
      });

      const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
      mensaje += `\nTotal: $${total.toFixed(0)}`;

      const mensajeCodificado = encodeURIComponent(mensaje);
      const numero = "542213631353";

      window.open(`https://wa.me/${numero}?text=${mensajeCodificado}`, '_blank');
    });
  }
});
