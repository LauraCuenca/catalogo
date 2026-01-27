import { actualizarContador } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {

  const modalElement = document.getElementById('modalConfirmarAgregar');
  const btnConfirmar = document.getElementById('btnConfirmarAgregar');
  const modalTexto = document.getElementById('modalTextoConfirmacion');

  if (!modalElement || !btnConfirmar || !modalTexto) return;

  const modal = new bootstrap.Modal(modalElement);
  let productoTemporal = null;

  document.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-agregar-carrito');
    if (!boton) return;

    const id = boton.dataset.id;
    const titulo = boton.dataset.titulo;
    const imagen = boton.dataset.imagen;
    const precio = parseFloat(boton.dataset.precio);

    const inputCantidad = boton
      .closest('.card-footer')
      .querySelector('.input-cantidad');

    const cantidad = parseInt(inputCantidad?.value) || 1;

    productoTemporal = { id, titulo, imagen, precio, cantidad };
    modalTexto.textContent = `¿Querés agregar "${titulo}" al carrito?`;
    modal.show();
  });

  btnConfirmar.addEventListener('click', () => {
    if (!productoTemporal) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existente = carrito.find(p => p.id === productoTemporal.id);
    if (existente) {
      existente.cantidad += productoTemporal.cantidad;
    } else {
      carrito.push(productoTemporal);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();

    productoTemporal = null;
    modal.hide();
  });



});