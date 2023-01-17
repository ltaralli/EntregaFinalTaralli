const stockProductos = [
  {
    id: 1, 
    nombre: "Amatista",
    precio: 2500,
    img: "../img/amatista.jpeg",
    cantidad: 1,
  },
  {
    id: 2, 
    nombre: "Paleta Glitter",
    precio: 1200,
    img: "../img/glitterPaleta.jpg",
    cantidad: 1,
  },
  {
    id: 3, 
    nombre: "Hornitos",
    precio: 1800,
    img: "../img/hornos.jpg",
    cantidad: 1,
  },
  {
    id: 4, 
    nombre: "Llavero para dos",
    precio: 850,
    img: "../img/llaveros.jpg",
    cantidad: 1,
  },
  {
    id: 5, 
    nombre: "Porta Sahumerios",
    precio: 950,
    img: "../img/portaasahumerios_mano.jpg",
    cantidad: 1,
  },
  {
    id: 6, 
    nombre: "Difusores",
    precio: 1250,
    img: "../img/nosotroscard4.jpg",
    cantidad: 1,
  },
  {
    id: 7, 
    nombre: "Atrapasueños",
    precio: 1600,
    img: "../img/atrapasueños.jpg",
    cantidad: 1,
  },
  {
    id: 8, 
    nombre: "Balsamo",
    precio: 1250,
    img: "../img/balsamo.jpg",
    cantidad: 1,
  },
  {
    id: 9, 
    nombre: "Polvo de hadas",
    precio: 1250,
    img: "../img/polvo_de_hadas2.jpg",
    cantidad: 1,
  },
  {
    id: 10, 
    nombre: "Pulsera p/ 2",
    precio: 850,
    img: "../img/pulseras.jpg",
    cantidad: 1,
  },
];

let carrito = [];

const grillaProductos = document.querySelector('#grilla__productos');
const contadorCarrito = document.querySelector('.header__carritoCont');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');


document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
} )


stockProductos.forEach((prod) => {
  const {id, nombre, precio, img, cantidad} = prod
  grillaProductos.innerHTML += `
  <div class="grid__item3 col-sm-12 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-once="true">
    <div class="producto">
      <img class="producto__img" src="${img}" alt="Imagen Producto">
      <p class="producto__titulo">${nombre}</p>
      <p class="producto__price">$ ${precio}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar al carrito </button>
    </div>
  </div>`
})

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "No hay productos en tu carrito",
        text: "Agregalos para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      console.log(procesarCompra)
      Swal.fire({
        title: 'Quiere finalizar la compra?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Compra realizada!', '', 'Recibiras un correo con la informacion')
          carrito.length = []
          mostrarCarrito()
        } else if (result.isDenied) {
          Swal.fire('Conpra cancelada', '', 'Regresando al carrito')
        }
      })
    }
  });
}

function eliminarCarrito() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Eliminar carrito?',
    text: "Perderas todos tus productos!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.length = []
      mostrarCarrito()
      swalWithBootstrapButtons.fire(
        'Carrito Eliminado!',
        'Todos tus productos fueron borrados',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Seguis contando con tus productos en el carrito',
        'error'
      )
    }
  })
}

vaciarCarrito.addEventListener('click', () => {
eliminarCarrito()
})

function agregarProducto(id) {
  const agregado = carrito.some(prod => prod.id == id)
  if (agregado){
    const prod = carrito.map(prod => {
      if (prod.id === id){
        prod.cantidad++
      }
    })
  } else {
      const item = stockProductos.find((prod) => prod.id === id )
      carrito.push(item)
      console.log(carrito); 
    }
    mostrarCarrito()
}


const mostrarCarrito = () => {
const modalBody = document.querySelector('.offcanvas-body')

  modalBody.innerHTML = '';

  carrito.forEach((prod) => {
    const {id, nombre, precio, img, cantidad} = prod
    modalBody.innerHTML += `
    <div class="offcanvas-contenedor">
      <div>
      <img class="img-fluid img-carrito" src="${img}"/>
      </div>
      <div>
      <p>${nombre}</p>
    <p>Precio: $ ${precio}</p>
    <p>Cantidad :${cantidad}</p>
    <button class="btn btn-danger" onclick="eliminarProducto(${id})">Eliminar</button>
      </div>
    </div>
    `;
  });
    if (carrito.length === 0){
      modalBody.innerHTML = `
      <p class="text center text primary parrafo">El carrito está vacio</p>`
    }
  contadorCarrito.textContent = carrito.length
  precioTotal.innerText =  carrito.reduce ((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  saveStorage()
}

function eliminarProducto(id){
  const juegoId = id
  carrito = carrito.filter ((juego) => juego.id !== juegoId)
  mostrarCarrito()
}

function saveStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

