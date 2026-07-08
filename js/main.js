document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
});

// Agregar producto al carrito
var botonesAgregar = document.getElementsByClassName('agregar-carrito');
for (var i = 0; i < botonesAgregar.length; i++) {
    botonesAgregar[i].addEventListener('click', agregarProducto);
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    localStorage.removeItem('carrito');
    cargarCarrito();
});

// Funciones
function agregarProducto(event) {
    var producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
};

var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
carrito.push(producto);
localStorage.setItem('carrito', JSON.stringify(carrito));
cargarCarrito();
}

function cargarCarrito() {
    var listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(li);
    }
}