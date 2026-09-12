/* ==================================================
   MORITA STUDIO
   SISTEMA DE RESERVAS Y COTIZACIÓN
================================================== */


/* =========================
   BOTÓN IR A SERVICIOS
========================= */

function irServicios() {

    document.getElementById("servicios").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   FORMATO DE DINERO
========================= */

function formatoPrecio(numero) {

    return "$" + numero.toLocaleString("es-CO");

}


/* =========================
   MOSTRAR FRANCES
========================= */

function mostrarFrances() {

    const frances = document.getElementById("frances");
    const opciones = document.getElementById("francesOpciones");

    if (frances.checked) {

        opciones.classList.remove("oculto");

    } else {

        opciones.classList.add("oculto");

    }

    actualizarCotizacion();

}


/* =========================
   MOSTRAR PIEDRERÍA
========================= */

function mostrarPiedreria() {

    const piedreria = document.getElementById("piedreria");
    const opciones = document.getElementById("piedreriaOpciones");

    if (piedreria.checked) {

        opciones.classList.remove("oculto");

    } else {

        opciones.classList.add("oculto");

    }

    actualizarCotizacion();

}


/* =========================
   MOSTRAR CAVIAR
========================= */

function mostrarCaviar() {

    const caviar = document.getElementById("caviar");
    const opciones = document.getElementById("caviarOpciones");

    if (caviar.checked) {

        opciones.classList.remove("oculto");

    } else {

        opciones.classList.add("oculto");

    }

    actualizarCotizacion();

}


/* =========================
   MOSTRAR REGALO
========================= */

function mostrarRegalo() {

    const primera = document.querySelector(
        'input[name="primera"]:checked'
    );

    const regalo = document.getElementById("regaloOpciones");

    if (primera && primera.value === "si") {

        regalo.classList.remove("oculto");

    } else {

        regalo.classList.add("oculto");

        document.querySelectorAll('input[name="spa"]').forEach(
            radio => radio.checked = false
        );

    }

    actualizarCotizacion();

}


/* =========================
   OBTENER SERVICIOS
========================= */

function obtenerServicios() {

    const seleccionados = [];

    document.querySelectorAll(".servicio:checked").forEach(
        servicio => {

            seleccionados.push({
                nombre: servicio.value,
                precio: Number(servicio.dataset.precio)
            });

        }
    );

    return seleccionados;

}


/* =========================
   ACTUALIZAR COTIZACIÓN
========================= */

function actualizarCotizacion() {

    const resumen = document.getElementById("resumenContenido");
    const totalElemento = document.getElementById("total");

    let total = 0;

    let html = "";

    const servicios = obtenerServicios();


    /* =========================
       SERVICIOS
    ========================== */

    if (servicios.length === 0) {

        html += `
            <p class="vacio">
                💅🏻 Selecciona algún servicio para comenzar.
            </p>
        `;

    } else {

        html += `
            <h3 style="color:#bd648c; margin-bottom:15px;">
                💅🏻 Servicios
            </h3>
        `;


        servicios.forEach(servicio => {

            total += servicio.precio;

            html += `
                <div class="resumen-item">

                    <span>
                        💅🏻 ${servicio.nombre}
                    </span>

                    <span>
                        ${formatoPrecio(servicio.precio)}
                    </span>

                </div>
            `;

        });

    }


    /* =========================
       FRANCES
    ========================== */

    const frances = document.getElementById("frances");

    if (frances.checked) {

        const tipoFrances =
            document.getElementById("tipoFrances").value;

        const cantidadFrances =
            Number(
                document.getElementById("cantidadFrances").value
            );

        const precioFrances = 5000;

        total += precioFrances;

        html += `
            <div class="resumen-item">

                <span>
                    🤍 Frances ${tipoFrances}
                    <br>
                    <small class="resumen-sub">
                        ${cantidadFrances} uñas
                    </small>
                </span>

                <span>
                    ${formatoPrecio(precioFrances)}
                </span>

            </div>
        `;

    }


    /* =========================
       DISEÑO ELABORADO
    ========================== */

    const diseno = document.getElementById("diseno");

    if (diseno.checked) {

        const precioDiseno = 5000;

        total += precioDiseno;

        html += `
            <div class="resumen-item">

                <span>
                    🎨 Diseño elaborado
                </span>

                <span>
                    ${formatoPrecio(precioDiseno)}
                </span>

            </div>
        `;

    }


    /* =========================
       PIEDRERÍA
    ========================== */

    const piedreria =
        document.getElementById("piedreria");

    if (piedreria.checked) {

        const tipo =
            document.getElementById("tipoPiedreria").value;

        const cantidad =
            Number(
                document.getElementById("cantidadPiedreria").value
            );

        const precioPepita = 500;

        const precioTotalPiedreria =
            cantidad * precioPepita;

        total += precioTotalPiedreria;

        html += `
            <div class="resumen-item">

                <span>
                    💎 ${tipo}
                    <br>

                    <small class="resumen-sub">
                        ${cantidad} pepita${cantidad !== 1 ? "s" : ""}
                    </small>
                </span>

                <span>
                    ${formatoPrecio(precioTotalPiedreria)}
                </span>

            </div>
        `;


        /* =========================
           CAVIAR
        ========================== */

        const caviar =
            document.getElementById("caviar");

        if (caviar.checked) {

            const cantidadCaviar =
                Number(
                    document.getElementById("cantidadCaviar").value
                );

            const precioCaviarPorUña = 200;

            const totalCaviar =
                cantidadCaviar * precioCaviarPorUña;

            total += totalCaviar;

            html += `
                <div class="resumen-item">

                    <span>
                        🫧 Caviar
                        <br>

                        <small class="resumen-sub">
                            ${cantidadCaviar} uña${cantidadCaviar !== 1 ? "s" : ""}
                        </small>
                    </span>

                    <span>
                        ${formatoPrecio(totalCaviar)}
                    </span>

                </div>
            `;

        }

    }


    /* =========================
       RETIRO
    ========================== */

    const retiro =
        document.getElementById("retiro");

    if (retiro.checked) {

        const precioRetiro = 7000;

        total += precioRetiro;

        html += `
            <div class="resumen-item">

                <span>
                    ♻️ Retiro de sistema de otro lugar
                </span>

                <span>
                    ${formatoPrecio(precioRetiro)}
                </span>

            </div>
        `;

    }


    /* =========================
       PRIMERA VISITA / SPA
    ========================== */

    const primera =
        document.querySelector(
            'input[name="primera"]:checked'
        );

    if (primera && primera.value === "si") {

        const spa =
            document.querySelector(
                'input[name="spa"]:checked'
            );

        if (spa) {

            html += `
                <div class="resumen-item">

                    <span>
                        🎁 SPA de primera visita
                        <br>

                        <small class="resumen-sub">
                            ${spa.value} — GRATIS 💗
                        </small>
                    </span>

                    <span>
                        GRATIS
                    </span>

                </div>
            `;

        }

    }


    /* =========================
       UBICACIÓN
    ========================== */

    const ubicacion =
        document.querySelector(
            'input[name="ubicacion"]:checked'
        );

    if (ubicacion) {

        const precioUbicacion =
            Number(ubicacion.dataset.precio);

        if (precioUbicacion > 0) {

            total += precioUbicacion;

            html += `
                <div class="resumen-item">

                    <span>
                        🏠 Domicilio
                    </span>

                    <span>
                        ${formatoPrecio(precioUbicacion)}
                    </span>

                </div>
            `;

        } else {

            html += `
                <div class="resumen-item">

                    <span>
                        🌸 Atención en Morita Studio
                    </span>

                    <span>
                        $0
                    </span>

                </div>
            `;

        }

    }


    /* =========================
       ACTUALIZAR HTML
    ========================== */

    resumen.innerHTML = html;

    totalElemento.textContent =
        formatoPrecio(total);

}


/* =========================
   OBTENER PRECIO FINAL
========================= */

function calcularTotal() {

    let total = 0;


    /* Servicios */

    const servicios = obtenerServicios();

    servicios.forEach(servicio => {

        total += servicio.precio;

    });


    /* Frances */

    if (
        document.getElementById("frances").checked
    ) {

        total += 5000;

    }


    /* Diseño */

    if (
        document.getElementById("diseno").checked
    ) {

        total += 5000;

    }


    /* Piedrería */

    if (
        document.getElementById("piedreria").checked
    ) {

        const cantidad =
            Number(
                document.getElementById(
                    "cantidadPiedreria"
                ).value
            );

        total += cantidad * 500;


        /* Caviar */

        if (
            document.getElementById("caviar").checked
        ) {

            const cantidadCaviar =
                Number(
                    document.getElementById(
                        "cantidadCaviar"
                    ).value
                );

            total += cantidadCaviar * 200;

        }

    }


    /* Retiro */

    if (
        document.getElementById("retiro").checked
    ) {

        total += 7000;

    }


    /* Domicilio */

    const ubicacion =
        document.querySelector(
            'input[name="ubicacion"]:checked'
        );

    if (ubicacion) {

        total += Number(
            ubicacion.dataset.precio
        );

    }


    return total;

}


/* =========================
   WHATSAPP
========================= */

function abrirWhatsApp() {

    const servicios = obtenerServicios();


    /* =========================
       VALIDAR SERVICIO
    ========================== */

    if (servicios.length === 0) {

        alert(
            "💗 Por favor selecciona al menos un servicio."
        );

        document
            .getElementById("servicios")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    /* =========================
       DATOS
    ========================== */

    const nombre =
        document.getElementById("nombre").value.trim();

    const telefono =
        document.getElementById("telefono").value.trim();

    const fecha =
        document.getElementById("fecha").value;

    const hora =
        document.getElementById("hora").value;

    const nota =
        document.getElementById("nota").value.trim();


    if (!nombre) {

        alert(
            "🌸 Por favor escribe tu nombre."
        );

        document.getElementById("nombre").focus();

        return;

    }


    if (!telefono) {

        alert(
            "📱 Por favor escribe tu número de teléfono."
        );

        document.getElementById("telefono").focus();

        return;

    }


    if (!fecha) {

        alert(
            "📅 Por favor selecciona una fecha."
        );

        document.getElementById("fecha").focus();

        return;

    }


    if (!hora) {

        alert(
            "🕐 Por favor selecciona una hora."
        );

        document.getElementById("hora").focus();

        return;

    }


    /* =========================
       CREAR MENSAJE
    ========================== */

    let mensaje =
        "💗✨ ¡Hola Michelle! Quiero reservar una cita en Morita Studio 🌸💅🏻\n\n";


    mensaje +=
        "👩🏻 *DATOS DE LA CLIENTA*\n";

    mensaje +=
        "Nombre: " + nombre + "\n";

    mensaje +=
        "Teléfono: " + telefono + "\n\n";


    /* =========================
       SERVICIOS
    ========================== */

    mensaje +=
        "💅🏻 *SERVICIOS*\n";

    servicios.forEach(servicio => {

        mensaje +=
            "• " +
            servicio.nombre +
            " — " +
            formatoPrecio(servicio.precio) +
            "\n";

    });

    mensaje += "\n";


    /* =========================
       FRANCES
    ========================== */

    const frances =
        document.getElementById("frances");

    if (frances.checked) {

        const tipoFrances =
            document.getElementById(
                "tipoFrances"
            ).value;

        const cantidadFrances =
            document.getElementById(
                "cantidadFrances"
            ).value;

        mensaje +=
            "🤍 *FRANCES*\n";

        mensaje +=
            "• Tipo: " +
            tipoFrances +
            "\n";

        mensaje +=
            "• Cantidad: " +
            cantidadFrances +
            " uñas\n";

        mensaje +=
            "• Adicional: $5.000\n\n";

    }


    /* =========================
       DISEÑO
    ========================== */

    if (
        document.getElementById("diseno").checked
    ) {

        mensaje +=
            "🎨 *DISEÑO ELABORADO*\n";

        mensaje +=
            "• Adicional: $5.000\n\n";

    }


    /* =========================
       PIEDRERÍA
    ========================== */

    const piedreria =
        document.getElementById("piedreria");

    if (piedreria.checked) {

        const tipo =
            document.getElementById(
                "tipoPiedreria"
            ).value;

        const cantidad =
            Number(
                document.getElementById(
                    "cantidadPiedreria"
                ).value
            );

        const precio =
            cantidad * 500;

        mensaje +=
            "💎 *PIEDRERÍA*\n";

        mensaje +=
            "• Tipo: " +
            tipo +
            "\n";

        mensaje +=
            "• Cantidad: " +
            cantidad +
            " pepita" +
            (cantidad !== 1 ? "s" : "") +
            "\n";

        mensaje +=
            "• Precio: " +
            formatoPrecio(precio) +
            "\n";


        /* CAVIAR */

        if (
            document.getElementById("caviar").checked
        ) {

            const cantidadCaviar =
                Number(
                    document.getElementById(
                        "cantidadCaviar"
                    ).value
                );

            const precioCaviar =
                cantidadCaviar * 200;

            mensaje +=
                "• 🫧 Caviar: " +
                cantidadCaviar +
                " uñas — " +
                formatoPrecio(precioCaviar) +
                "\n";

        }

        mensaje += "\n";

    }


    /* =========================
       RETIRO
    ========================== */

    if (
        document.getElementById("retiro").checked
    ) {

        mensaje +=
            "♻️ *RETIRO*\n";

        mensaje +=
            "• Sistema realizado en otro lugar\n";

        mensaje +=
            "• Valor: $7.000\n\n";

    }


    /* =========================
       PRIMERA VISITA
    ========================== */

    const primera =
        document.querySelector(
            'input[name="primera"]:checked'
        );

    if (
        primera &&
        primera.value === "si"
    ) {

        const spa =
            document.querySelector(
                'input[name="spa"]:checked'
            );

        mensaje +=
            "🎁 *PRIMERA VISITA*\n";

        mensaje +=
            "• Sí, es mi primera cita 💗\n";

        if (spa) {

            mensaje +=
                "• SPA elegido: " +
                spa.value +
                "\n";

            mensaje +=
                "• Valor: GRATIS 🎀\n";

        }

        mensaje += "\n";

    } else {

        mensaje +=
            "💅🏻 *CLIENTA FRECUENTE*\n";

        mensaje +=
            "• No es mi primera cita\n\n";

    }


    /* =========================
       UBICACIÓN
    ========================== */

    const ubicacion =
        document.querySelector(
            'input[name="ubicacion"]:checked'
        );

    if (ubicacion) {

        mensaje +=
            "📍 *UBICACIÓN*\n";

        if (
            ubicacion.value === "Domicilio"
        ) {

            mensaje +=
                "• 🏠 A domicilio\n";

            mensaje +=
                "• Domicilio: $7.100\n\n";

        } else {

            mensaje +=
                "• 🌸 Morita Studio\n\n";

        }

    }


    /* =========================
       FECHA Y HORA
    ========================== */

    mensaje +=
        "📅 *CITA*\n";

    mensaje +=
        "• Fecha: " +
        fecha +
        "\n";

    mensaje +=
        "• Hora: " +
        hora +
        "\n\n";


    /* =========================
       NOTA
    ========================== */

    if (nota) {

        mensaje +=
            "💬 *NOTA DE LA CLIENTA*\n";

        mensaje +=
            nota +
            "\n\n";

    }


    /* =========================
       TOTAL
    ========================== */

    const total =
        calcularTotal();

    mensaje +=
        "━━━━━━━━━━━━━━━━━━\n";

    mensaje +=
        "💗 *TOTAL A PAGAR: " +
        formatoPrecio(total) +
        "*\n";

    mensaje +=
        "━━━━━━━━━━━━━━━━━━\n\n";

    mensaje +=
        "🎀 ¡Gracias por elegir Morita Studio! 💅🏻✨";


    /* =========================
       ABRIR WHATSAPP
    ========================== */

    const numero =
        "573053836192";

    const enlace =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(
        enlace,
        "_blank"
    );

}


/* =========================
   FECHA MÍNIMA
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const fecha =
            document.getElementById("fecha");

        if (fecha) {

            const hoy =
                new Date();

            const año =
                hoy.getFullYear();

            const mes =
                String(
                    hoy.getMonth() + 1
                ).padStart(2, "0");

            const dia =
                String(
                    hoy.getDate()
                ).padStart(2, "0");

            fecha.min =
                `${año}-${mes}-${dia}`;

        }

        actualizarCotizacion();

    }
);
