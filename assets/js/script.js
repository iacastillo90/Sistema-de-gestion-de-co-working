/**
 * WorkHub | Jaffa CoWork
 * Módulo principal de interacciones del DOM y validación de formularios
 *
 * Estructura:
 *   1. ANDREA  — Efectos de navegación
 *   2. ALEX    — Validación y envío del formulario de registro
 *
 * Para agregar código nuevo: ubica el bloque de tu nombre
 * y agrega tus funciones debajo del comentario correspondiente.
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       ANDREA — Efectos de Navegación
       Para seguir editando: agrega tus funciones debajo de este bloque
       ========================================================================== */

    const navbar = document.getElementById("mainNav");

    // Agrega la clase .scrolled al navbar al bajar 50px
    // El estilo visual de .scrolled está definido en style.css → bloque ANDREA
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }


    /* ==========================================================================
       ALEX — Validación y Envío del Formulario de Registro
       Para seguir editando: agrega tus funciones debajo de este bloque
       ========================================================================== */

    const formRegistro  = document.getElementById("form-registro");
    const mensajeAlerta = document.getElementById("mensaje");

    // Verificamos que el formulario exista en la página antes de agregar eventos
    if (formRegistro) {

        formRegistro.addEventListener("submit", (e) => {

            // Evitamos que la página se recargue (comportamiento por defecto del form)
            e.preventDefault();

            // Limpiamos el mensaje anterior antes de cada nueva validación
            mensajeAlerta.textContent = "";

            // Capturamos los valores eliminando espacios en blanco con .trim()
            const nombre   = document.getElementById("nombre").value.trim();
            const email    = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const telefono = document.getElementById("telefono").value.trim();

            // Expresiones Regulares para validación estricta
            // emailRegex: formato estándar usuario@dominio.extension
            const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // telefonoRegex: acepta números, espacios y '+' para códigos de país (ej: +56 9 1234 5678)
            const telefonoRegex = /^\+56[0-9]{9}$/;

            // --- Validaciones (cada return corta la ejecución si hay error) ---

            if (!nombre || !email || !password || !telefono) {
                mostrarMensaje("Por favor, completa todos los campos.", "var(--primary-red)");
                return;
            }

            if (!emailRegex.test(email)) {
                mostrarMensaje("Por favor, ingresa un correo electrónico válido.", "var(--primary-red)");
                return;
            }

            if (password.length < 8) {
                mostrarMensaje("La contraseña debe tener al menos 6 caracteres.", "var(--primary-red)");
                return;
            }

            if (!telefonoRegex.test(telefono)) {
                mostrarMensaje("Por favor, ingresa un número de teléfono válido.", "var(--primary-red)");
                return;
            }

            // --- Si llega aquí, todas las validaciones pasaron ---

            // Datos listos para conectar con el backend (Node.js / Express)
            console.log("Datos listos para enviar al servidor:", { nombre, email, password, telefono });

            // Mensaje de éxito y limpieza del formulario
            mostrarMensaje("¡Registro completado exitosamente! Bienvenido a WorkHub.", "green");
            formRegistro.reset();

            // Borra el mensaje de éxito después de 5 segundos
            setTimeout(() => {
                mensajeAlerta.textContent = "";
            }, 5000);
        });
    }

    /**
     * Función auxiliar compartida
     * Muestra un mensaje en el span #mensaje con el color indicado
     * @param {string} texto  - Mensaje a mostrar
     * @param {string} color  - Color CSS válido (hex, nombre, var())
     */
    function mostrarMensaje(texto, color) {
        mensajeAlerta.textContent = texto;
        mensajeAlerta.style.color = color;
    }

});