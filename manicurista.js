/* =====================================================
   MORITA STUDIO
   SISTEMA DE RESERVAS + LOGIN
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

const PRECIO_DOMICILIO = 7100;
const PRECIO_RETIRO = 7000;
const PRECIO_FRANCES = 5000;
const PRECIO_DISENO = 5000;
const PRECIO_PIEDRA = 500;
const PRECIO_CAVIAR = 200;
const PRECIO_SPA = 7000;


/* =====================================================
   INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    establecerFechaMinima();

    cargarUsuarioActual();

    configurarEventos();

    actualizarCotizacion();

});


/* =====================================================
   MENU MOVIL
===================================================== */

function alternarMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* =====================================================
   NAVEGACION
===================================================== */

function irReservar() {

    document
        .getElementById("reservar")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   FECHA MINIMA
===================================================== */

function establecerFechaMinima() {

    const fecha = document.getElementById("fechaCita");

    if (!fecha) return;

    const hoy = new Date();

    const year = hoy.getFullYear();

    const month = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        hoy.getDate()
    ).padStart(2, "0");

    fecha.min =
        `${year}-${month}-${day}`;

}


/* =====================================================
   EVENTOS
===================================================== */

function configurarEventos() {

    document
        .querySelectorAll(".servicio")
        .forEach(input => {

            input.addEventListener(
                "change",
                actualizarCotizacion
            );

        });


    document
        .getElementById("frances")
        .addEventListener(
            "change",
            function () {

                mostrarOcultar(
                    "opcionesFrances",
                    this.checked
                );

                actualizarCotizacion();

            }
        );


    document
        .getElementById("disenoElaborado")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("piedreria")
        .addEventListener(
            "change",
            function () {

                mostrarOcultar(
                    "opcionesPiedreria",
                    this.checked
                );

                actualizarCotizacion();

            }
        );


    document
        .getElementById("caviar")
        .addEventListener(
            "change",
            function () {

                mostrarOcultar(
                    "opcionesCaviar",
                    this.checked
                );

                actualizarCotizacion();

            }
        );


    document
        .getElementById("retiro")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("cantidadPiedreria")
        .addEventListener(
            "input",
            actualizarCotizacion
        );


    document
        .getElementById("cantidadCaviar")
        .addEventListener(
            "input",
            actualizarCotizacion
        );


    document
        .getElementById("tipoFrances")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("cantidadFrances")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("tipoSpa")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("spaNormal")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .querySelectorAll(
            'input[name="ubicacion"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    const esDomicilio =
                        this.value === "Domicilio";

                    mostrarOcultar(
                        "campoDireccion",
                        esDomicilio
                    );

                    actualizarCotizacion();

                }
            );

        });


    document
        .getElementById("nombreCliente")
        .addEventListener(
            "input",
            actualizarCotizacion
        );


    document
        .getElementById("telefonoCliente")
        .addEventListener(
            "input",
            actualizarCotizacion
        );


    document
        .getElementById("fechaCita")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("horaCita")
        .addEventListener(
            "change",
            actualizarCotizacion
        );


    document
        .getElementById("notaCliente")
        .addEventListener(
            "input",
            actualizarCotizacion
        );


    document
        .getElementById("direccion")
        .addEventListener(
            "input",
            actualizarCotizacion
        );

}


/* =====================================================
   MOSTRAR / OCULTAR
===================================================== */

function mostrarOcultar(id, mostrar) {

    const elemento =
        document.getElementById(id);

    if (!elemento) return;

    elemento.classList.toggle(
        "hidden",
        !mostrar
    );

}


/* =====================================================
   USUARIOS
===================================================== */

function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("moritaUsuarios")
    ) || [];

}


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "moritaUsuarios",
        JSON.stringify(usuarios)
    );

}


/* =====================================================
   CREAR CUENTA
===================================================== */

function crearCuenta(event) {

    event.preventDefault();

    const nombre =
        document
            .getElementById("registroNombre")
            .value
            .trim();

    const telefono =
        document
            .getElementById("registroTelefono")
            .value
            .trim();

    const correo =
        document
            .getElementById("registroCorreo")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("registroPassword")
            .value;


    const error =
        document.getElementById(
            "errorRegistro"
        );


    error.textContent = "";


    if (
        !nombre ||
        !telefono ||
        !correo ||
        !password
    ) {

        error.textContent =
            "Completa todos los campos.";

        return;

    }


    if (password.length < 6) {

        error.textContent =
            "La contraseña debe tener mínimo 6 caracteres.";

        return;

    }


    const usuarios =
        obtenerUsuarios();


    const usuarioExiste =
        usuarios.some(
            usuario =>
                usuario.correo === correo
        );


    if (usuarioExiste) {

        error.textContent =
            "Este correo ya tiene una cuenta.";

        return;

    }


    const nuevoUsuario = {

        id:
            Date.now(),

        nombre,

        telefono,

        correo,

        password,

        primeraCitaDisponible: true,

        primeraCitaUsada: false

    };


    usuarios.push(
        nuevoUsuario
    );


    guardarUsuarios(
        usuarios
    );


    localStorage.setItem(
        "moritaUsuarioActual",
        JSON.stringify(nuevoUsuario)
    );


    cerrarModalLogin();

    cargarUsuarioActual();


    document.getElementById(
        "nombreCliente"
    ).value = nombre;


    document.getElementById(
        "telefonoCliente"
    ).value = telefono;


    actualizarCotizacion();


    mostrarMensajeExito(
        "🎉 ¡Cuenta creada! Tu beneficio de primera cita está disponible."
    );

}


/* =====================================================
   INICIAR SESION
===================================================== */

function iniciarSesion(event) {

    event.preventDefault();


    const correo =
        document
            .getElementById("loginCorreo")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const error =
        document.getElementById(
            "errorLogin"
        );


    error.textContent = "";


    const usuarios =
        obtenerUsuarios();


    const usuario =
        usuarios.find(
            user =>
                user.correo === correo &&
                user.password === password
        );


    if (!usuario) {

        error.textContent =
            "Correo o contraseña incorrectos.";

        return;

    }


    localStorage.setItem(
        "moritaUsuarioActual",
        JSON.stringify(usuario)
    );


    cerrarModalLogin();

    cargarUsuarioActual();


    document.getElementById(
        "nombreCliente"
    ).value =
        usuario.nombre;


    document.getElementById(
        "telefonoCliente"
    ).value =
        usuario.telefono;


    actualizarCotizacion();


    mostrarMensajeExito(
        `💗 ¡Bienvenida nuevamente, ${usuario.nombre.split(" ")[0]}!`
    );

}


/* =====================================================
   CARGAR USUARIO
===================================================== */

function obtenerUsuarioActual() {

    return JSON.parse(
        localStorage.getItem(
            "moritaUsuarioActual"
        )
    );

}


function cargarUsuarioActual() {

    const usuario =
        obtenerUsuarioActual();


    const btnLogin =
        document.getElementById(
            "btnAbrirLogin"
        );


    const usuarioHeader =
        document.getElementById(
            "usuarioHeader"
        );


    const nombreHeader =
        document.getElementById(
            "nombreUsuarioHeader"
        );


    if (!usuario) {

        btnLogin.classList.remove(
            "hidden"
        );

        usuarioHeader.classList.add(
            "hidden"
        );

        actualizarBeneficio();

        return;

    }


    btnLogin.classList.add(
        "hidden"
    );


    usuarioHeader.classList.remove(
        "hidden"
    );


    nombreHeader.textContent =
        `Hola, ${usuario.nombre.split(" ")[0]} 💗`;


    document.getElementById(
        "nombreCliente"
    ).value =
        usuario.nombre;


    document.getElementById(
        "telefonoCliente"
    ).value =
        usuario.telefono;


    actualizarBeneficio();

}


/* =====================================================
   CERRAR SESION
===================================================== */

function cerrarSesion() {

    localStorage.removeItem(
        "moritaUsuarioActual"
    );


    document.getElementById(
        "tipoSpa"
    ).value = "";


    document.getElementById(
        "spaNormal"
    ).value = "";


    cargarUsuarioActual();

    actualizarCotizacion();


    mostrarMensajeExito(
        "Has cerrado sesión. 💗"
    );

}


/* =====================================================
   BENEFICIO PRIMERA CITA
===================================================== */

function actualizarBeneficio() {

    const usuario =
        obtenerUsuarioActual();


    const sinLogin =
        document.getElementById(
            "beneficioNoLogin"
        );


    const disponible =
        document.getElementById(
            "beneficioDisponible"
        );


    const usado =
        document.getElementById(
            "beneficioUsado"
        );


    sinLogin.classList.add(
        "hidden"
    );

    disponible.classList.add(
        "hidden"
    );

    usado.classList.add(
        "hidden"
    );


    if (!usuario) {

        sinLogin.classList.remove(
            "hidden"
        );

        return;

    }


    if (
        usuario.primeraCitaDisponible &&
        !usuario.primeraCitaUsada
    ) {

        disponible.classList.remove(
            "hidden"
        );

    } else {

        usado.classList.remove(
            "hidden"
        );

    }


    actualizarCotizacion();

}


/* =====================================================
   OBTENER SERVICIOS
===================================================== */

function obtenerServicios() {

    const seleccionados =
        document.querySelectorAll(
            ".servicio:checked"
        );


    return Array.from(
        seleccionados
    ).map(input => ({

        nombre:
            input.value,

        precio:
            Number(
                input.dataset.precio
            )

    }));

}


/* =====================================================
   OBTENER UBICACION
===================================================== */

function obtenerUbicacion() {

    const seleccionada =
        document.querySelector(
            'input[name="ubicacion"]:checked'
        );


    return seleccionada
        ? seleccionada.value
        : "Estudio";

}


/* =====================================================
   CALCULAR TOTAL
===================================================== */

function calcularTotal() {

    let total = 0;


    const servicios =
        obtenerServicios();


    servicios.forEach(servicio => {

        total += servicio.precio;

    });


    /* FRANCES */

    const frances =
        document.getElementById(
            "frances"
        ).checked;


    if (frances) {

        total += PRECIO_FRANCES;

    }


    /* DISEÑO */

    const diseno =
        document.getElementById(
            "disenoElaborado"
        ).checked;


    if (diseno) {

        total += PRECIO_DISENO;

    }


    /* PIEDRERIA */

    const piedreria =
        document.getElementById(
            "piedreria"
        ).checked;


    if (piedreria) {

        const cantidad =
            Math.max(
                1,
                Number(
                    document.getElementById(
                        "cantidadPiedreria"
                    ).value
                ) || 1
            );


        total +=
            cantidad *
            PRECIO_PIEDRA;

    }


    /* CAVIAR */

    const caviar =
        document.getElementById(
            "caviar"
        ).checked;


    if (caviar) {

        const cantidad =
            Math.min(
                10,
                Math.max(
                    1,
                    Number(
                        document.getElementById(
                            "cantidadCaviar"
                        ).value
                    ) || 1
                )
            );


        total +=
            cantidad *
            PRECIO_CAVIAR;

    }


    /* RETIRO */

    const retiro =
        document.getElementById(
            "retiro"
        ).checked;


    if (retiro) {

        total += PRECIO_RETIRO;

    }


    /* DOMICILIO */

    if (
        obtenerUbicacion() ===
        "Domicilio"
    ) {

        total +=
            PRECIO_DOMICILIO;

    }


    /* SPA */

    const usuario =
        obtenerUsuarioActual();


    if (usuario) {

        if (
            usuario.primeraCitaDisponible &&
            !usuario.primeraCitaUsada
        ) {

            const spa =
                document.getElementById(
                    "tipoSpa"
                ).value;


            if (spa) {

                // Es gratis.
                total += 0;

            }

        } else {

            const spa =
                document.getElementById(
                    "spaNormal"
                ).value;


            if (spa) {

                total += PRECIO_SPA;

            }

        }

    }


    return total;

}


/* =====================================================
   ACTUALIZAR COTIZACION
===================================================== */

function actualizarCotizacion() {

    const resumen =
        document.getElementById(
            "resumen"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    const servicios =
        obtenerServicios();


    let html = "";

    let hayAlgo = false;


    /* SERVICIOS */

    if (servicios.length > 0) {

        hayAlgo = true;


        html += `
            <div class="summary-subtitle">
                💅 Servicios
            </div>
        `;


        servicios.forEach(servicio => {

            html += `
                <div class="summary-item">
                    <span>${servicio.nombre}</span>
                    <span>${formatearDinero(servicio.precio)}</span>
                </div>
            `;

        });

    }


    /* FRANCES */

    if (
        document.getElementById(
            "frances"
        ).checked
    ) {

        hayAlgo = true;


        const tipo =
            document.getElementById(
                "tipoFrances"
            ).value;


        const cantidad =
            document.getElementById(
                "cantidadFrances"
            ).value;


        html += `
            <div class="summary-item">
                <span>🇫🇷 Frances ${tipo} (${cantidad} uñas)</span>
                <span>${formatearDinero(PRECIO_FRANCES)}</span>
            </div>
        `;

    }


    /* DISEÑO */

    if (
        document.getElementById(
            "disenoElaborado"
        ).checked
    ) {

        hayAlgo = true;


        html += `
            <div class="summary-item">
                <span>🎨 Diseño elaborado</span>
                <span>${formatearDinero(PRECIO_DISENO)}</span>
            </div>
        `;

    }


    /* PIEDRERIA */

    if (
        document.getElementById(
            "piedreria"
        ).checked
    ) {

        hayAlgo = true;


        const tipo =
            document.getElementById(
                "tipoPiedreria"
            ).value;


        const cantidad =
            Math.max(
                1,
                Number(
                    document.getElementById(
                        "cantidadPiedreria"
                    ).value
                ) || 1
            );


        const precio =
            cantidad *
            PRECIO_PIEDRA;


        html += `
            <div class="summary-item">
                <span>💎 ${tipo} (${cantidad} pepitas)</span>
                <span>${formatearDinero(precio)}</span>
            </div>
        `;

    }


    /* CAVIAR */

    if (
        document.getElementById(
            "caviar"
        ).checked
    ) {

        hayAlgo = true;


        const cantidad =
            Math.min(
                10,
                Math.max(
                    1,
                    Number(
                        document.getElementById(
                            "cantidadCaviar"
                        ).value
                    ) || 1
                )
            );


        const precio =
            cantidad *
            PRECIO_CAVIAR;


        html += `
            <div class="summary-item">
                <span>✨ Caviar (${cantidad} uñas)</span>
                <span>${formatearDinero(precio)}</span>
            </div>
        `;

    }


    /* RETIRO */

    if (
        document.getElementById(
            "retiro"
        ).checked
    ) {

        hayAlgo = true;


        html += `
            <div class="summary-item">
                <span>🧹 Retiro de otro lugar</span>
                <span>${formatearDinero(PRECIO_RETIRO)}</span>
            </div>
        `;

    }


    /* SPA */

    const usuario =
        obtenerUsuarioActual();


    if (usuario) {

        if (
            usuario.primeraCitaDisponible &&
            !usuario.primeraCitaUsada
        ) {

            const spa =
                document.getElementById(
                    "tipoSpa"
                ).value;


            if (spa) {

                hayAlgo = true;


                html += `
                    <div class="summary-item">
                        <span>🎁 SPA de bienvenida: ${spa}</span>
                        <span>GRATIS</span>
                    </div>
                `;

            }

        } else {

            const spa =
                document.getElementById(
                    "spaNormal"
                ).value;


            if (spa) {

                hayAlgo = true;


                html += `
                    <div class="summary-item">
                        <span>🫧 SPA: ${spa}</span>
                        <span>${formatearDinero(PRECIO_SPA)}</span>
                    </div>
                `;

            }

        }

    }


    /* UBICACION */

    const ubicacion =
        obtenerUbicacion();


    hayAlgo = true;


    html += `
        <div class="summary-subtitle">
            📍 Atención
        </div>
    `;


    if (ubicacion === "Domicilio") {

        html += `
            <div class="summary-item">
                <span>🚗 Domicilio</span>
                <span>${formatearDinero(PRECIO_DOMICILIO)}</span>
            </div>
        `;

    } else {

        html += `
            <div class="summary-item">
                <span>🏡 Estudio</span>
                <span>Gratis</span>
            </div>
        `;

    }


    if (!hayAlgo) {

        resumen.innerHTML = `
            <p class="empty-summary">
                Selecciona un servicio para comenzar
                tu cotización. 💗
            </p>
        `;

    } else {

        resumen.innerHTML =
            html;

    }


    const total =
        calcularTotal();


    totalElemento.textContent =
        formatearDinero(total);

}


/* =====================================================
   FORMATEAR DINERO
===================================================== */

function formatearDinero(valor) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(valor);

}


/* =====================================================
   VALIDAR RESERVA
===================================================== */

function validarReserva() {

    ocultarError();


    const servicios =
        obtenerServicios();


    if (servicios.length === 0) {

        mostrarError(
            "💅 Selecciona al menos un servicio."
        );

        return false;

    }


    const nombre =
        document
            .getElementById(
                "nombreCliente"
            )
            .value
            .trim();


    const telefono =
        document
            .getElementById(
                "telefonoCliente"
            )
            .value
            .trim();


    const fecha =
        document
            .getElementById(
                "fechaCita"
            )
            .value;


    const hora =
        document
            .getElementById(
                "horaCita"
            )
            .value;


    if (!nombre) {

        mostrarError(
            "🌸 Escribe tu nombre completo."
        );

        return false;

    }


    if (!telefono) {

        mostrarError(
            "📱 Escribe tu número de teléfono."
        );

        return false;

    }


    if (!fecha) {

        mostrarError(
            "📅 Selecciona la fecha de tu cita."
        );

        return false;

    }


    if (!hora) {

        mostrarError(
            "🕐 Selecciona la hora de tu cita."
        );

        return false;

    }


    if (
        obtenerUbicacion() ===
        "Domicilio"
    ) {

        const direccion =
            document
                .getElementById(
                    "direccion"
                )
                .value
                .trim();


        if (!direccion) {

            mostrarError(
                "🏠 Escribe la dirección para el domicilio."
            );

            return false;

        }

    }


    const usuario =
        obtenerUsuarioActual();


    if (!usuario) {

        mostrarError(
            "🔐 Debes iniciar sesión o crear una cuenta antes de reservar."
        );

        abrirModalLogin();

        return false;

    }


    if (
        usuario.primeraCitaDisponible &&
        !usuario.primeraCitaUsada
    ) {

        const spa =
            document.getElementById(
                "tipoSpa"
            ).value;


        if (!spa) {

            mostrarError(
                "🎁 Elige uno de los SPA de bienvenida para utilizar tu beneficio."
            );

            return false;

        }

    }


    return true;

}


/* =====================================================
   WHATSAPP
===================================================== */

function abrirWhatsApp() {

    if (!validarReserva()) {

        return;

    }


    const usuario =
        obtenerUsuarioActual();


    const servicios =
        obtenerServicios();


    const nombre =
        document
            .getElementById(
                "nombreCliente"
            )
            .value
            .trim();


    const telefono =
        document
            .getElementById(
                "telefonoCliente"
            )
            .value
            .trim();


    const fecha =
        document
            .getElementById(
                "fechaCita"
            )
            .value;


    const hora =
        document
            .getElementById(
                "horaCita"
            )
            .value;


    const nota =
        document
            .getElementById(
                "notaCliente"
            )
            .value
            .trim();


    const ubicacion =
        obtenerUbicacion();


    const total =
        calcularTotal();


    let mensaje = "";


    mensaje +=
        "Hola Michelle 💗, quiero reservar una cita en Morita Studio.\n\n";


    mensaje +=
        "🌸 *DATOS DE LA CLIENTA*\n";

    mensaje +=
        `👤 Nombre: ${nombre}\n`;

    mensaje +=
        `📱 Teléfono: ${telefono}\n`;


    if (usuario) {

        mensaje +=
            `📧 Cuenta: ${usuario.correo}\n`;

    }


    mensaje +=
        "\n💅 *SERVICIOS*\n";


    servicios.forEach(
        servicio => {

            mensaje +=
                `• ${servicio.nombre} — ${formatearDinero(servicio.precio)}\n`;

        }
    );


    /* FRANCES */

    if (
        document.getElementById(
            "frances"
        ).checked
    ) {

        const tipo =
            document.getElementById(
                "tipoFrances"
            ).value;


        const cantidad =
            document.getElementById(
                "cantidadFrances"
            ).value;


        mensaje +=
            `• 🇫🇷 Frances ${tipo} — ${cantidad} uñas — ${formatearDinero(PRECIO_FRANCES)}\n`;

    }


    /* DISEÑO */

    if (
        document.getElementById(
            "disenoElaborado"
        ).checked
    ) {

        mensaje +=
            `• 🎨 Diseño elaborado — ${formatearDinero(PRECIO_DISENO)}\n`;

    }


    /* PIEDRERIA */

    if (
        document.getElementById(
            "piedreria"
        ).checked
    ) {

        const tipo =
            document.getElementById(
                "tipoPiedreria"
            ).value;


        const cantidad =
            Math.max(
                1,
                Number(
                    document.getElementById(
                        "cantidadPiedreria"
                    ).value
                ) || 1
            );


        const precio =
            cantidad *
            PRECIO_PIEDRA;


        mensaje +=
            `• 💎 Piedrería ${tipo} — ${cantidad} pepitas — ${formatearDinero(precio)}\n`;

    }


    /* CAVIAR */

    if (
        document.getElementById(
            "caviar"
        ).checked
    ) {

        const cantidad =
            Math.min(
                10,
                Math.max(
                    1,
                    Number(
                        document.getElementById(
                            "cantidadCaviar"
                        ).value
                    ) || 1
                )
            );


        const precio =
            cantidad *
            PRECIO_CAVIAR;


        mensaje +=
            `• ✨ Caviar — ${cantidad} uñas — ${formatearDinero(precio)}\n`;

    }


    /* RETIRO */

    if (
        document.getElementById(
            "retiro"
        ).checked
    ) {

        mensaje +=
            `• 🧹 Retiro de otro lugar — ${formatearDinero(PRECIO_RETIRO)}\n`;

    }


    /* SPA */

    if (
        usuario.primeraCitaDisponible &&
        !usuario.primeraCitaUsada
    ) {

        const spa =
            document.getElementById(
                "tipoSpa"
            ).value;


        mensaje +=
            `• 🎁 SPA de primera cita: ${spa} — GRATIS\n`;

    } else {

        const spa =
            document.getElementById(
                "spaNormal"
            ).value;


        if (spa) {

            mensaje +=
                `• 🫧 SPA: ${spa} — ${formatearDinero(PRECIO_SPA)}\n`;

        }

    }


    /* UBICACION */

    mensaje +=
        "\n📍 *LUGAR DE LA CITA*\n";


    if (ubicacion === "Domicilio") {

        const direccion =
            document
                .getElementById(
                    "direccion"
                )
                .value
                .trim();


        mensaje +=
            `🚗 Domicilio — ${formatearDinero(PRECIO_DOMICILIO)}\n`;

        mensaje +=
            `🏠 Dirección: ${direccion}\n`;

    } else {

        mensaje +=
            "🏡 Estudio — Sin costo adicional\n";

    }


    /* FECHA */

    mensaje +=
        "\n📅 *FECHA Y HORA*\n";

    mensaje +=
        `📅 Fecha: ${fecha}\n`;

    mensaje +=
        `🕐 Hora: ${hora}\n`;


    /* NOTA */

    if (nota) {

        mensaje +=
            "\n📝 *NOTA*\n";

        mensaje +=
            `${nota}\n`;

    }


    /* TOTAL */

    mensaje +=
        "\n💰 *TOTAL ESTIMADO: " +
        formatearDinero(total) +
        "*\n";


    mensaje +=
        "\n💗 Quedo atenta a la confirmación de mi cita. ¡Gracias! 🌸";


    /* MARCAR BENEFICIO COMO UTILIZADO */

    if (
        usuario.primeraCitaDisponible &&
        !usuario.primeraCitaUsada
    ) {

        const spa =
            document.getElementById(
                "tipoSpa"
            ).value;


        if (spa) {

            marcarPrimeraCitaComoUsada(
                usuario.id
            );

        }

    }


    const numero =
        "573053836192";


    const enlace =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(
            mensaje
        );


    window.open(
        enlace,
        "_blank"
    );

}


/* =====================================================
   MARCAR PRIMERA CITA COMO USADA
===================================================== */

function marcarPrimeraCitaComoUsada(
    idUsuario
) {

    const usuarios =
        obtenerUsuarios();


    const indice =
        usuarios.findIndex(
            usuario =>
                usuario.id === idUsuario
        );


    if (indice === -1) {

        return;

    }


    usuarios[indice]
        .primeraCitaDisponible = false;


    usuarios[indice]
        .primeraCitaUsada = true;


    guardarUsuarios(
        usuarios
    );


    localStorage.setItem(
        "moritaUsuarioActual",
        JSON.stringify(
            usuarios[indice]
        )
    );


    actualizarBeneficio();

}


/* =====================================================
   MODAL
===================================================== */

function abrirModalLogin() {

    const modal =
        document.getElementById(
            "modalLogin"
        );


    modal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


function cerrarModalLogin() {

    const modal =
        document.getElementById(
            "modalLogin"
        );


    modal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   ALTERNAR LOGIN / REGISTRO
===================================================== */

function alternarFormulario() {

    const login =
        document.getElementById(
            "formLogin"
        );


    const registro =
        document.getElementById(
            "formRegistro"
        );


    const titulo =
        document.getElementById(
            "tituloModal"
        );


    const subtitulo =
        document.getElementById(
            "subtituloModal"
        );


    const texto =
        document.getElementById(
            "textoSwitch"
        );


    const boton =
        document.getElementById(
            "btnSwitch"
        );


    const mostrandoLogin =
        !login.classList.contains(
            "hidden"
        );


    if (mostrandoLogin) {

        login.classList.add(
            "hidden"
        );

        registro.classList.remove(
            "hidden"
        );


        titulo.textContent =
            "Crea tu cuenta 🌸";


        subtitulo.textContent =
            "Regístrate para reservar y recibir tu beneficio de bienvenida.";


        texto.textContent =
            "¿Ya tienes una cuenta?";


        boton.textContent =
            "Iniciar sesión";


    } else {

        registro.classList.add(
            "hidden"
        );

        login.classList.remove(
            "hidden"
        );


        titulo.textContent =
            "Bienvenida a Morita Studio 💗";


        subtitulo.textContent =
            "Inicia sesión para reservar tu cita.";


        texto.textContent =
            "¿No tienes una cuenta?";


        boton.textContent =
            "Crear cuenta";

    }

}


/* =====================================================
   MENSAJES
===================================================== */

function mostrarMensajeExito(
    mensaje
) {

    const error =
        document.getElementById(
            "mensajeError"
        );


    error.classList.remove(
        "hidden"
    );


    error.style.background =
        "#eefaf2";


    error.style.color =
        "#548466";


    error.style.borderColor =
        "#c6e7d0";


    error.textContent =
        mensaje;


    setTimeout(() => {

        ocultarError();

    }, 4000);

}


function mostrarError(
    mensaje
) {

    const error =
        document.getElementById(
            "mensajeError"
        );


    error.classList.remove(
        "hidden"
    );


    error.style.background =
        "#fff0f0";


    error.style.color =
        "#b44f62";


    error.style.borderColor =
        "#f2c3cc";


    error.textContent =
        mensaje;


    error.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function ocultarError() {

    const error =
        document.getElementById(
            "mensajeError"
        );


    error.classList.add(
        "hidden"
    );

}


/* =====================================================
   CERRAR MODAL AL HACER CLICK AFUERA
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "modalLogin"
            );


        if (
            event.target === modal
        ) {

            cerrarModalLogin();

        }

    }
);
