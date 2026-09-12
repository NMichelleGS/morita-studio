// =====================================================
// MORITA STUDIO
// FUNCIONES
// =====================================================


// BOTÓN "RESERVAR MI CITA"

function irContacto() {

    const contacto = document.getElementById("contacto");

    contacto.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// BOTÓN DE WHATSAPP
// =====================================================

function abrirWhatsApp() {

    const numero = "573053836192";

    const mensaje =
        "Hola Michelle 💗, quiero reservar una cita en Morita Studio. " +
        "Me gustaría conocer la disponibilidad y los servicios.";

    const enlace =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(enlace, "_blank");

}
