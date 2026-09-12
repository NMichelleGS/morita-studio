// BOTON PARA IR A CONTACTO

function irContacto() {

    document.getElementById("contacto").scrollIntoView();

}


// BOTON DE WHATSAPP

function abrirWhatsApp() {

    var numero = "573053836192";

    var mensaje = "Hola Michelle 💗, quiero reservar una cita en Morita Studio.";

    var enlace = "https://wa.me/" + numero +
                 "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");

}