let index= prompt ("Bienvenido/a a Flecha Cangreja! \n ¿Qué producto deseas comprar? Ingresá la opción que corresponda \n 1 - Dijes \n 2 - Pulseras \n 0 - Salir");

if (index != "0") {

    switch (index) {
        case "1": 
        let producDijes= prompt("Estos dijes tenemos para vos: \n 1 - Corazon de acero quirurjico \n 2 - Oreo (para compartir) \n Ingresa 0 para salir");
        
            switch (producDijes){
                case "1":
                    alert("Te solicitamos los siguientes datos para ponernos en contacto:");
                    let nombreCompadorCorazon=prompt("Ingresá tu nombre por favor");
                    let mailCompradorCorazon= prompt("Ingresá tu correo por favor");
                    alert("En minutos te llegará el formulario al mail " + mailCompradorCorazon);
                    console.log( "El comprador es " + nombreCompadorCorazon + " y su email es " + mailCompradorCorazon);   
                break;

                case "2":
                    alert("Te solicitamos los siguientes datos para ponernos en contacto:");
                    let nombreCompadorOreo=prompt("Ingresá tu nombre por favor");
                    let mailCompradorOreo= prompt("Ingresá tu correo por favor");
                    alert("En minutos te llegará el formulario al mail " + mailCompradorOreo);
                    console.log( "El comprador es " + nombreCompadorOreo + " y su email es " + mailCompradorOreo);
                break;

                case "0":
                    alert("Te esperamos en una proxima oportunidad. Saludos!");
                break;

                default:
                    alert("Ingresa una opción correcta");
                break;
            }
            break;

            case "2":
                let producPulsera= prompt("Estas pulseras tenemos para vos: \n 1 - Contra la envidia (hilo rojo) \n 2 - Minimalista de Acero Quirurgico \n Ingresa 0 para salir");

                switch (producPulsera){
                    case "1":
                        alert("Te solicitamos los siguientes datos para ponernos en contacto:");
                        let nombreCompadorPulEnvid=prompt("Ingresá tu nombre por favor");
                        let mailCompradorCPulEnvid= prompt("Ingresá tu correo por favor");
                        alert("En minutos te llegará el formulario al mail " + mailCompradorCPulEnvid);
                        console.log( "El comprador es " + nombreCompadorPulEnvid + " y su email es " + mailCompradorCPulEnvid);
                        
                    break;

                    case "2":
                        alert("Te solicitamos los siguientes datos para ponernos en contacto:");
                        let nombreCompadorPulMinim=prompt("Ingresá tu nombre por favor");
                        let mailCompradorCPulMinim= prompt("Ingresá tu correo por favor");
                        alert("En minutos te llegará el formulario al mail " + mailCompradorCPulMinim);
                        console.log( "El comprador es " + nombreCompadorPulMinim + " y su email es " + mailCompradorCPulMinim);
            
                    break;

                    case "0":
                        alert("Te esperamos en una proxima oportunidad. Saludos!");
                        break;

                    default:
                        alert("Ingresa una opción correcta");
                        break;
                }
            break;

            default:
                alert("Ingresa una opción correcta");
            break;
        
}
}
alert("Te esperamos en una proxima oportunidad. Saludos!");