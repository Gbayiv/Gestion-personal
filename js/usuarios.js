document.addEventListener("DOMContentLoaded", () => {
    const formUsuarios = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    renderUsers();

    if (formUsuarios) {
        formUsuarios.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const cargo = document.getElementById("cargo").value.trim();

            if (!nombre || !apellido || !correo || !cargo) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            if (users.some(user => user.correo === correo)) {
                alert("El correo ya está registrado.");
                return;
            }

            const newUser = { 
                nombre, 
                apellido, 
                correo, 
                cargo,
                fechaRegistro: new Date().toLocaleDateString()
            };
            
            users.push(newUser);
            saveUsers();
            renderUsers();
            formUsuarios.reset();
        });
    }

    function renderUsers() {
        userList.innerHTML = "";
        
        if (users.length === 0) {
            userList.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        No hay usuarios registrados. Agrega el primero usando el formulario.
                    </div>
                </div>
            `;
            return;
        }

        users.forEach((user, index) => {
            const userCard = document.createElement("div");
            userCard.className = "user-card";
            userCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${user.nombre} ${user.apellido}</h5>
                        <p class="card-text">
                            <strong><i class="bi bi-envelope"></i> Correo:</strong> ${user.correo}<br>
                            <strong><i class="bi bi-briefcase"></i> Cargo:</strong> ${user.cargo}<br>
                            <strong><i class="bi bi-calendar"></i> Registro:</strong> ${user.fechaRegistro}
                        </p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-sm btn-outline-warning me-2" onclick="editUser(${index})">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${index})">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;
            userList.appendChild(userCard);
        });
    }

    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    window.editUser = (index) => {
        const user = users[index];
        document.getElementById("nombre").value = user.nombre;
        document.getElementById("apellido").value = user.apellido;
        document.getElementById("correo").value = user.correo;
        document.getElementById("cargo").value = user.cargo;

        users.splice(index, 1);
        saveUsers();
        renderUsers();
    };

    window.deleteUser = (index) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            users.splice(index, 1);
            saveUsers();
            renderUsers();
        }
    };
});