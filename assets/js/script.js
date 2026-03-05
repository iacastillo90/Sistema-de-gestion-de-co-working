/**
 * WorkHub - Gestión de Interfaz Profesional
 */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("mainNav");

    // 1. Efecto Scroll en Navbar para cambio de estética
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Feedback de interacción en botones de acción
    const actionButtons = document.querySelectorAll(".btn-white, .btn-outline-custom");

    actionButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (btn.getAttribute('href') === "#") {
                e.preventDefault();
                alert("¡Excelente elección! Estamos preparando la vista de sedes para ti.");
            }
        });
    });
});