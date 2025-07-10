// Ejercicio 2 - Mostrar nombre del alumno en <nav> y consola
// function imprimirDatosAlumno() {
//     const alumno = {
//         dni: 43877963,
//         nombre: "Lucia",
//         apellido: "Pokoik"
//     };

//     // Imprimir en consola
//     console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

//     // Mostrar en el div con clase "nombreAlumno"
//     let nombreDiv = document.querySelector(".nombreAlumno");
//     if (nombreDiv) {
//         nombreDiv.innerText = `${alumno.nombre} ${alumno.apellido}`;
//     }
// }
function imprimirDatosAlumno() {
  const alumnaL = {
    dni: 43877963,
    nombre: "Lucia",
    apellido: "Pokoik",
  };
  const alumnoA = {
    dni: 40985636,
    nombre: "Alejandro",
    apellido: "Voutsina",
  };
  // Imprimir en consola
  console.log(
    `Alumno: ${alumnaL.nombre} ${alumnaL.apellido} - DNI: ${alumnaL.dni}`
  );
  console.log(
    `Alumno: ${alumnoA.nombre} ${alumnoA.apellido} - DNI: ${alumnoA.dni}`
  );

  // Mostrar en el div con clase "nombreAlumno"
  let nombreDiv1 = document.querySelector(".nombreAlumno1");
  let nombreDiv2 = document.querySelector(".nombreAlumno2");
  if (nombreDiv1) {
    nombreDiv1.innerText = `${alumnaL.nombre} ${alumnaL.apellido}`;
  }
  if (nombreDiv2) {
    nombreDiv2.innerText = `${alumnoA.nombre} ${alumnoA.apellido}`;
  }
}

////////variables globales///////
let productoContainer = document.querySelector(".contenedor-productos");
let barraBusqueda = document.querySelector(".barraBusqueda");
let carrito = [];
let products = [];
//Ejercicio 3: Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de init() .

function mostrarProductos(array) {
  let cartaProducto = "";
  for (let i = 0; i < array.length; i++) {
    console.log(array[i].id);
    cartaProducto += `<div class="card-producto">
                            <img src='${array[i].image}' alt="">
                            <h3>${array[i].name}</h3>
                            <p>$${array[i].price}</p>
                            <button onclick="agregarAlCarrito(${array[i].id})">Agregar al carrito</button>
                        </div>`;
  }
  productoContainer.innerHTML = cartaProducto;
}

//Ejercicio 4: Implementar una función de filtro
function filtrarProductos(array) {
  barraBusqueda.addEventListener("keyup", function () {
    let valorInput = barraBusqueda.value.toLowerCase();
    console.log(valorInput);
    let productosFiltrados = array.filter((producto) =>
      producto.name.toLowerCase().includes(valorInput)
    );
    mostrarProductos(productosFiltrados);
  });
}

//Ejercicio 5:
/*  1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe
mostrarse por console.log()
2. Incorporar la funcion mostrarCarrito() asociada al boton de cada elemento del carrito El HTML generado debe
seguir esta estructura:
<li class="bloque-item">
<p class="nombre-item">nombreProducto - precioProducto</p>
<button class="boton-eliminar">Eliminar</button>
</li>
3. Incorporar la funcion eliminarProducto() . Este debe estar asociado al boton del carrito*/

////5.1
/*function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    contador.innerText = carrito.length;
} */
function agregarAlCarrito(id) {
    let producto = products.find((p) => p.id === id);
    carrito.push(producto);
    console.log("Carrito actual:", carrito);
    mostrarCarrito();
    actualizarContador();
    guardarCarritoEnLocalStorage();
}

//5.2
function mostrarCarrito() {
    const itemsCarrito = document.getElementById("items-carrito");
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = `<p>No hay elementos en el carrito.</p>`;
        return;
    }

    let html = "";
    carrito.forEach((producto, index) => {
        html += `<li class="bloque-item">
                        <p class="nombre-item">${producto.name} - $${producto.price}</p>
                        <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                    </li>`;
    });

    itemsCarrito.innerHTML = `<ul>${html}</ul>`;
}

//5.3
function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarContador();
    guardarCarritoEnLocalStorage();
}

//Ejercicio 6: guardar y cargar carrito en la localStorage
// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
        actualizarContador();
    }
}

//Ejercicio 7:
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    contador.innerText = carrito.length;

    // Si no hay productos, vaciar localStorage
    if (carrito.length === 0) {
        localStorage.removeItem("carrito");
    }

    // Actualizar también el total
    actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
    const totalElement = document.getElementById("precio-total");

    if (carrito.length === 0) {
        totalElement.innerText = "$0.00";
        return;
    }

    const total = carrito.reduce((suma, producto) => suma + producto.price, 0);

    totalElement.innerText = `$${total.toFixed(2)}`;
}

//Ejercicio 8: ordenar elementos
// Botones de orden
document
    .getElementById("mostrar-suplementos")
    .addEventListener("click", function () {
        const suplementos = products.filter(
        (producto) => producto.category === "suplemento"
        );
        mostrarProductos(suplementos);
    });

document
    .getElementById("mostrar-equipamiento")
    .addEventListener("click", function () {
        const equipamiento = products.filter(
        (producto) => producto.category === "equipamiento"
        );
        mostrarProductos(equipamiento);
    });

document.getElementById("mostrar-todos").addEventListener("click", function () {
    mostrarProductos(products); // Muestra todos los productos originales
});

//Ejercicio 9: vaciar carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarContador();
    localStorage.removeItem("carrito");
}

// Función que se ejecuta en la web
function init() {
    cargarCarritoDesdeLocalStorage();
    imprimirDatosAlumno();

    fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => {
        products = data.payload; // ✅ CORRECTO
        mostrarProductos(products);
        filtrarProductos(products);

        // Eventos
        // document
        //     .getElementById("ordenar-nombre")
        //     .addEventListener("click", function () {
        //     const ordenadoPorNombre = [...products].sort((a, b) =>
        //         a.name.localeCompare(b.name)
        //     );
        //     mostrarProductos(ordenadoPorNombre);
        // });

        // document
        //     .getElementById("ordenar-precio")
        //     .addEventListener("click", function () {
        //     const ordenadoPorPrecio = [...products].sort(
        //         (a, b) => a.price - b.price
        //     );
        //     mostrarProductos(ordenadoPorPrecio);
        // });

        document
        .getElementById("vaciar-carrito")
        .addEventListener("click", vaciarCarrito);
    })
    .catch((error) => {
        console.error("Error al cargar productos:", error);
    });
}
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    contador.innerText = carrito.length;

    // Si no hay productos, vaciar localStorage
    if (carrito.length === 0) {
        localStorage.removeItem("carrito");
    }

  // Actualizar también el total
    actualizarTotalCarrito();
}
document.addEventListener("DOMContentLoaded", init);

