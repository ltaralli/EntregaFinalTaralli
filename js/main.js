let stockProductos = [
  {
     "id":1,
     "nombre":"Amatista",
     "precio":2500,
     "img":"../img/amatista.jpeg",
     "cantidad":1
  },
  {
     "id":2,
     "nombre":"Paleta Glitter",
     "precio":1200,
     "img":"../img/glitterPaleta.jpg",
     "cantidad":1
  },
  {
     "id":3,
     "nombre":"Hornitos",
     "precio":1800,
     "img":"../img/hornos.jpg",
     "cantidad":1
  },
  {
     "id":4,
     "nombre":"Llavero para dos",
     "precio":850,
     "img":"../img/llaveros.jpg",
     "cantidad":1
  },
  {
     "id":5,
     "nombre":"Porta Sahumerios",
     "precio":950,
     "img":"../img/portaasahumerios_mano.jpg",
     "cantidad":1
  },
  {
     "id":6,
     "nombre":"Difusores",
     "precio":1250,
     "img":"../img/nosotroscard4.jpg",
     "cantidad":1
  },
  {
     "id":7,
     "nombre":"Atrapasueños",
     "precio":1600,
     "img":"../img/atrapasueños.jpg",
     "cantidad":1
  },
  {
     "id":8,
     "nombre":"Balsamo",
     "precio":1250,
     "img":"../img/balsamo.jpg",
     "cantidad":1
  },
  {
     "id":9,
     "nombre":"Polvo de hadas",
     "precio":1250,
     "img":"../img/polvo_de_hadas2.jpg",
     "cantidad":1
  },
  {
     "id":10,
     "nombre":"Pulsera p/ 2",
     "precio":850,
     "img":"../img/pulseras.jpg",
     "cantidad":1
  }
]


const grillaProductos = document.querySelector('#grilla__productos');
const contadorCarrito = document.querySelector('.header__carritoCont');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');
const totalProceso = document.querySelector('#totalProceso');
const formulario = document.querySelector('#procesar-pago')

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
} )

formulario.addEventListener('submit', enviarPedido)

vaciarCarrito.addEventListener('click', () => {
carrito.length = [];
eliminarCarrito()
})


// SE PINTAN LOS PRODUCTOS EN EL DOM
fetch('../data/data.json')
.then((response) => response.json())
.then((data) =>{
  data.forEach((prod) => {
    const {id, nombre, precio, img} = prod
    grillaProductos.innerHTML += `
    <div class="grid__item3 col-sm-12 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-once="true">
    <div class="producto">
    <img class="producto__img" src="${img}" alt="Imagen Producto">
    <p class="producto__titulo">${nombre}</p>
    <p class="producto__price">$ ${precio}</p>
    <button class="btn btn-info btn-sm mb-2" onclick="agregarProducto(${id})">Agregar al carrito </button>
    </div>
    </div>`
  })


  
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
      // console.log(procesarCompra)
      Swal.fire({
        title: 'Quiere finalizar la compra?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          $('#exampleModal').modal('show')
          procesarPedido()
          mostrarCarrito()
        } else if (result.isDenied) {
          Swal.fire('Compra cancelada', '', 'Regresando al carrito')
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
    confirmButtonText: 'BORRAR',
    cancelButtonText: 'CANCELAR',
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
      <div class="mb-1">
      <img class="img-fluid img-carrito" src="${img}"/>
      </div>
      <div class="mb-1">
      <p class="offcanvas__textH">${nombre}</p>
      <p class="offcanvas__textP mb-1">Cantidad :${cantidad}</p>
      <p class="offcanvas__textP mb-1">Precio: $ ${precio}</p>
    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${id})">Eliminar</button>
      </div>
    </div>
    `;
  });
    if (carrito.length === 0){
      modalBody.innerHTML = `
      <p class="offcanvas__textH d-flex justify-content-center ">El carrito está vacio</p>`
    }
  contadorCarrito.textContent = carrito.length
  precioTotal.innerText =  carrito.reduce ((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  saveStorage()
  
  
}


function eliminarProducto(id) {
  const productId = id;
  carrito = carrito.filter((juego) => juego.id !== productId);
  mostrarCarrito();
}

function procesarPedido(){ 
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector('#lista-compra tbody')
    const {id, nombre, precio, cantidad, img} = prod
    
    const row = document.createElement('tr')
    row.innerHTML += `
    <td>
    <img class="img-fluid img-carrito" src="${img}"/>
    </td>
    <td class="offcanvas__textP">${nombre}</td>
    <td class="offcanvas__textP">${cantidad}</td>
    <td class="offcanvas__textP">${precio}</td>
    <td class="offcanvas__textP text-end">${precio * cantidad}</td>
  `;
  
  listaCompra.appendChild(row);
})
totalProceso.innerText = carrito.reduce ((acc, prod) => acc + prod.cantidad * prod.precio, 0);
}

function enviarPedido(e){
  e.preventDefault()

  const cliente = document.querySelector('#name').value
  const email = document.querySelector('#email').value
  const telefono = document.querySelector('#phone').value
  
  const spinner = document.querySelector('#spinner')
  
  spinner.classList.remove('disabled')
  spinner.classList.add('active')
  setTimeout(() => {
    spinner.classList.remove('active')
    spinner.classList.add('disabled')
    Swal.fire('Compra realizada correctamente')
    $('#exampleModal').modal('hide')
    
    setTimeout(() =>{
      window.location.reload()
      localStorage.clear()
    }, 2000)
  }, 2500)
}

function saveStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

