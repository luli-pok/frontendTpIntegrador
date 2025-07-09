// js/login.js
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("continuarBtn");

    if (btn) {
        btn.addEventListener("click", () => {
        const nombre = document.getElementById("nombreCliente").value.trim();

        if (nombre !== "") {
            sessionStorage.setItem("clienteNombre", nombre);
            window.location.href = "index.html"; // redirige al sitio principal
        } else {
            alert("Por favor ingresá un nombre válido.");
        }
        });
    }

    // Si ya tiene nombre y está en login.html, lo redirige automáticamente
    if (sessionStorage.getItem("clienteNombre") && window.location.pathname.includes("login.html")) {
        window.location.href = "index.html";
    }
});
