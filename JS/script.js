//Método ready

$( document ).ready(function() {
    console.log('El DOM está listo');
});

/* Array de productos */

const productos = [{id:0, producto: "Cafe", precio:80, stock:5, pedido:0},
                {id:1, producto: "Capuccino", precio:90, stock:5, pedido:0},
                {id:2, producto: "Lagrima", precio:85, stock:5, pedido:0},
                {id:3, producto: "Te", precio:70, stock:5, pedido:0}
];

let precioTotal = 0;
let nombreCliente = "";


//Funciones 

function agregarAlCarrito(id){
    if(productos[id].stock > 0){
        precioTotal += productos[id].precio;
        productos[id].stock -= 1;
        productos[id].pedido += 1;
        $('#listadoPedidos').prepend(`<li> ${productos[id].producto} agregado, precio: ${productos[id].precio}$</li>`);
        $("#listadoPedidos li:first-child").fadeOut("fast", function(){
            $("#listadoPedidos li:first-child").fadeIn("slow");
            });
        
    }else{
        alert(`no hay mas stock de ${productos[id].producto}, por favor seleccione otro producto!`);
    }
}
function calcularPrecioFinal(){
   let cafeFinal =  productos[0].precio * productos[0].pedido;
   let capuccinoFinal =  productos[1].precio * productos[1].pedido;
   let lagrimaFinal =  productos[2].precio * productos[2].pedido;
   let teFinal =  productos[3].precio * productos[3].pedido;
   let precioFinal = cafeFinal + capuccinoFinal + lagrimaFinal + teFinal;
   return precioFinal
}

//Eventos JQuery

//CAPTURAR NOMBRE DEL CLIENTE Y ALMACENAMIENTO EN STORAGE
$('#btnNombre').on('click', function(){
    let nombreCliente = document.getElementById("inputNombre").value;
    alert(`Te damos la bienvenida ${nombreCliente}!`);
    $('#nameSlot').prepend(`<p>Esperamos que disfrutes tu pedido ${nombreCliente}!</p>`);
    guardarLocal("NombreCliente", nombreCliente );

    return nombreCliente
    
});

//CLICKS AGREGAR AL CARRITO

$('#btnCafe').on('click', function(){
    agregarAlCarrito(0);
});
$('#btnCapuccino').on('click', function(){
    agregarAlCarrito(1);
});
$('#btnLagrima').on('click', function(){
    agregarAlCarrito(2);
});
$('#btnTe').on('click', function(){
    agregarAlCarrito(3);
});

//CLICK PRECIO FINAL

$('#btnTotal').on('click', function(){
    
    $('#totalAPagar').append(`<h3 class=" my-3 d-inline-flex float-right" id="badgeTAP">Total a pagar: ${calcularPrecioFinal()}$ </h3>`);
    $("#badgeTAP").fadeOut("fast", function(){
        $("#badgeTAP").fadeIn("fast");
        });
        $('#badgeTAP').css({
            "background-color" : "#48A70B",
            "border-radius" : "10px",
            "color" : "white",
            "padding": "8px",
        });
});

//CLICK VACIAR LISTA

$('#btnClear').on('click', function(){
    $("li").remove()
    $('#totalAPagar h3').remove()
    for (i=0; i<5; i++){
        productos[i].stock=5;
        productos[i].pedido=0;
    };
});

//Storage y JSON

const guardarLocal = (clave,valor) => {localStorage.setItem(clave,valor)};
guardarLocal("listaProductos", JSON.stringify(productos));



//AJAX con JQuery

const URLGET = "data/info.json";

$("#btnAJAX").click(() => {
    $.getJSON(URLGET, function (respuesta, estado) {
        if(estado === "success"){
            let misDatos = respuesta;
            for (const dato of misDatos) {
                $("#divAJAX").append (`<div class="mt-3">
                                        <h3>Nombre del producto: ${dato.nombre}</h3>
                                        <p>Origen: ${dato.origen} </p>
                                        <p>Descripcion: ${dato.desc} </p>
                                        </div>`);
            }
        }
    });
});
