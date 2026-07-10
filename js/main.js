document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    cargarFavoritos();
});

// Agregar producto al carrito -> función agregarCarrito
var btnAgregarCarrito = document.getElementsByClassName('agregar-carrito');
for (var i = 0; i < btnAgregarCarrito.length; i++) {
    btnAgregarCarrito[i].addEventListener('click', agregarCarrito);
}

// Agregar producto a favoritos > función agregarFavorito
var btnAgregarFavorito = document.getElementsByClassName('agregar-favorito');
for (var i = 0; i < btnAgregarFavorito.length; i++) {
    btnAgregarFavorito[i].addEventListener('click', agregarFavorito);
}

// Simulación de compra
var botonComprar = document.getElementById('comprar-carrito');
if (botonComprar) {
    botonComprar.addEventListener('click', function() {
        alert("¡Felicidades por su compra! Esta es una simulación.");
    });
}

// Simulación de Loggin
var botonLogin = document.getElementById('iniciar-sesion');
if (botonLogin) {
    botonLogin.addEventListener('click', function(event) {
        event.preventDefault(); // evita que el link intente "navegar" a ningún lado
        alert("Próximamente podrá iniciar sesión");
    });
}

// -------------------------------------------------
// Botones de "Vaciar Carrito" y "Vaciar Favoritos"
// -------------------------------------------------
var botonVaciarCarrito = document.getElementById('vaciar-carrito');
if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener('click', function() {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });
}

var botonVaciarFav = document.getElementById('vaciar-favoritos');
if (botonVaciarFav) {
    botonVaciarFav.addEventListener('click', function() {
        localStorage.removeItem('favoritos');
        cargarFavoritos();
    });
}

// ----------------------
// Funciones del carrito
// ----------------------
function agregarCarrito(event) {
    var producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };

    // Lee lo que ya había guardado en 'carrito' (o un array vacío si es la primera vez)
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    cargarCarrito(); // actualizo la lista en pantalla con el nuevo producto incluido
}

function cargarCarrito() {
    var listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) return; // si esta página no tiene esa lista (ej. index.html), no seguimos

    listaCarrito.innerHTML = ''; // limpiamos antes para no duplicar

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var total = 0; // acá acumulamos la suma totol del carrito

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(li);

        total = total + parseFloat(producto.precio); // convertimos texto -> número y sumamos
    }

    var contador = document.getElementById('contador-productos');
    if (contador) {
        contador.textContent = carrito.length;
    }

    var totalElemento = document.getElementById('total-carrito');
    if (totalElemento) {
        totalElemento.textContent = total;
    }
}
// -----------------------
// Funciones de favoritos
// -----------------------
function agregarFavorito(event) {
    var producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };

    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.push(producto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    cargarFavoritos();
}

function cargarFavoritos() {
    var listaFavoritos = document.getElementById('lista-favoritos');
    if (!listaFavoritos) return;

    listaFavoritos.innerHTML = '';

    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    for (var i = 0; i < favoritos.length; i++) {
        var producto = favoritos[i];
        var li = document.createElement('li');
        li.textContent = producto.nombre;
        listaFavoritos.appendChild(li);
    }
}

// ------------------------------------------------------------------
// LIBROS TRAÍDOS DESDE LA API (solo aplica en apibooks.html)
// ------------------------------------------------------------------
var contenedorProductos = document.getElementById("productos-container");
if (contenedorProductos) {
    fetch('https://softwium.com/api/books?limit=10')
    .then(response => {
        if (!response.ok) {       //si no hay respuesta de la api lanzamos un ERROR que detiene la ejecución de la app
            throw new Error(`HTTP error! Status: ${response.status}`); // status aclara el tipo de error numerico
        }
        return response.json();
    })
    .then(data => {         // data tiene el response.json() obtenido del 1er then -> data es un conj de objetos
        data.forEach(producto => {      // producto itera sobre cada elemento de data
            const tarjeta = document.createElement("div");
            tarjeta.innerHTML = `
                <h3>${producto.title}</h3>
                <p>Autores: ${producto.authors}</p>
                <button class="agregar-favorito" data-id="${producto.id}" data-nombre="${producto.title}" data-precio="0">Agregar a Favoritos</button>
            `;
            contenedorProductos.appendChild(tarjeta);
        });
        contenedorProductos.addEventListener('click', function(event) {
            if (event.target.classList.contains('agregar-favorito')) {
                agregarFavorito(event);
            }
        });
    })
    .catch(error => {
        console.log("Error de internet");
    });
}