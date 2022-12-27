const productos = [
    {nombre: "Pulsera Roja", precio: 400 },
    {nombre: "Dije para compartir", precio: 350 },
    {nombre: "Piedra amatista", precio: 1500 },
    {nombre: "Collar", precio: 300 },
    {nombre: "sahumerios", precio: 250},
  ]
 
 let carrito = []
 
 let seleccion = alert("Bienvenido a Flecha Cangreja")
 
 while (seleccion != "si" && seleccion != "no"){
   seleccion = prompt ("Desea comprar algun articulo? \n - SI \n - NO")
 }
 
 if(seleccion == "si"){
   alert("Te mostramos nuestros productos")
    let todoslosProductos = productos.map ((producto) => producto.nombre + " $" + producto.precio); 
    alert(todoslosProductos.join("\n"))
 } else if (seleccion == no){ 
   alert("Te esperamos en una proxima oportunidad")
 }
 
 while(seleccion != "no"){ 
   let producto = prompt("Ingresá el producto a adquirir")
   let precio = 0
 
   if(producto == "pulsera roja" || producto == "dije para compartir" || producto == "piedra amatista" || producto == "collar" || producto == "sahumerios") {
     switch(producto) {
       case "pulsera roja":
         precio = 400;
         break;
       case "dije para compartir":
         precio = 350;
         break;
       case "piedra amatista":
         precio = 1500;
         break;
       case "collar":
          precio = 300;
         break;
       case "sahumerios":
         precio = 250;
         break;
       default:
         break;
     }
   let unidades = parseInt(prompt("Cuantas unidades desea?"))
 
   carrito.push({producto, unidades, precio})
   console.log(carrito);
   } else {
     alert("Producto invalido, por favor reingresa el elemento")
   }
 
   seleccion = prompt("Desea agragar mas productos? \n - SI \n - NO")
   
   while(seleccion === "no"){
     alert("Ya prepararemos su pedido!")
     carrito.forEach((carritoFinal) => {
       console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar por producto $ ${carritoFinal.unidades * carritoFinal.precio}`);
     })
     break;
   }
 }
 
 const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0)
 
 alert(`El monto total de la compra es: $${total}. Muchas gracias!`)