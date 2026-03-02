
document.addEventListener("DOMContentLoaded", function() {

    const botonesHero = document.querySelectorAll(".btn-white");

    botonesHero.forEach(function(boton) {
        boton.addEventListener("click", function(e) {
            e.preventDefault();

            boton.classList.toggle("active");

            const numero = "56912345678"; // 👈 CAMBIA POR TU NÚMERO REAL
            const mensaje = "Hola, quiero agendar una visita a sus espacios de coworking.";

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
        });
    });

});