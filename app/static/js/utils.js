export function actualizarContador() {
  const contador = document.getElementById('cart-count');
  if (contador) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
    contador.textContent = total;
  }
}
