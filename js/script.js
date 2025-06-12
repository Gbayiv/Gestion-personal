document.addEventListener("DOMContentLoaded", () => {
    const formUsuarios = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    mostrarUsuarios(); // Cargar usuarios guardados en localStorage

    if (formUsuarios) {
        formUsuarios.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Formulario enviado");

            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const cargo = document.getElementById("cargo").value.trim();

            console.log("Valores capturados:", { nombre, apellido, correo, cargo });

            if (!nombre || !apellido || !correo || !cargo) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            if (users.some(user => user.correo === correo)) {
                alert("El correo ya está registrado.");
                return;
            }

            const usuario = { nombre, apellido, correo, cargo };
            users.push(usuario);
            localStorage.setItem("users", JSON.stringify(users)); // Guardar en localStorage

            console.log("Usuarios en la lista:", users);
            mostrarUsuarios();
            formUsuarios.reset();
        });
    }

    function mostrarUsuarios() {
        userList.innerHTML = ""; // Limpiar lista antes de agregar nuevos elementos

        users.forEach((usuario, index) => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card", "col-md-4");
            userCard.innerHTML = `
                <div class="card p-3">
                    <strong>${usuario.nombre} ${usuario.apellido}</strong><br>
                    Correo: ${usuario.correo}<br>
                    Cargo: ${usuario.cargo}<br>
                    <button class="btn btn-warning btn-sm mt-2" onclick="editarUsuario(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm mt-2" onclick="eliminarUsuario(${index})">Eliminar</button>
                </div>
            `;
            userList.appendChild(userCard);
        });

        console.log("Usuarios renderizados en pantalla:", users);
    }

    window.editarUsuario = (index) => {
        const usuario = users[index];

        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("apellido").value = usuario.apellido;
        document.getElementById("correo").value = usuario.correo;
        document.getElementById("cargo").value = usuario.cargo;

        users.splice(index, 1); // Elimina el usuario antes de actualizarlo
        localStorage.setItem("users", JSON.stringify(users)); // Guardar cambios
        mostrarUsuarios();
    };

    window.eliminarUsuario = (index) => {
        if (confirm("¿Deseas eliminar este usuario?")) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users)); // Guardar cambios
            mostrarUsuarios();
        }
    };
});