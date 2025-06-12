document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (!nombre || !correo || !mensaje) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            // Aquí puedes agregar el código para enviar el formulario
            alert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.");
            contactForm.reset();
        });
    }
});