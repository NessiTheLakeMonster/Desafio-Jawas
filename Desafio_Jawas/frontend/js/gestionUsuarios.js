import { getUsuarios, deleteUsuario, getUsuarioById } from "./http/http_gestionUsuarios.js";

// Variables del HTML
const tablaUsuarios = document.getElementById('tablaUsuarios');

// Botones
const btnEliminar = document.getElementById('btnBorrar');
const btnEditar = document.getElementById('btnModificar');
const btnCrear = document.getElementById('btnAgregar');

// Funciones 
export function cabeceraTablaUsuarios() {
    let cabecera = document.createElement('tr');

    let headers = ['', 'ID', 'Foto de Perfil', 'Nombre', 'Apellido', 'Email', 'email_verified_at', 'created_at', 'updated_at'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaUsuarios.appendChild(cabecera);
}

export function crearFilasTablaUsuario(data) {
    return data.map(user => {
        let createdAt = new Date(user.created_at);
        let updatedAt = new Date(user.updated_at);

        let formattedCreatedAt = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
        let formattedUpdatedAt = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

        return `
            <tr>
                <td><input class="checkbox-usuario" type="checkbox" name="idUsuario" value="${user.id}"></td>
                <td>${user.id}</td>
                <td><img src="${user.fotoPerfil}" alt="Foto de perfil" width="100"></td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.email}</td>
                <td>${user.email_verified_at}</td>
                <td>${formattedCreatedAt}</td>
                <td>${formattedUpdatedAt}</td>
            </tr>
        `;
    }).join('');
}

export function guardarUsuarioSeleccionado(idUsuario) {
    getUsuarioById(idUsuario).then(data => {
        localStorage.setItem('usuarioSeleccionado', JSON.stringify(data));
        console.log(data);
    });
}

export function limpiarLocalStorage() {
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('usuarioSeleccionado');
    localStorage.removeItem('modificar');
    localStorage.removeItem('crear');
}

export function _Init() {
    limpiarLocalStorage();

    getUsuarios().then(data => {
        cabeceraTablaUsuarios();
        tablaUsuarios.innerHTML += crearFilasTablaUsuario(data);

        let checkboxes = document.querySelectorAll('.checkbox-usuario');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    localStorage.setItem('idUsuario', this.value);
                    guardarUsuarioSeleccionado(this.value);
                } else {
                    localStorage.removeItem('idUsuario');
                    localStorage.removeItem('usuarioSeleccionado');

                    location.reload();

                }
            });
        });
    });
}

// Eventos de botones
btnEliminar.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuario');

    deleteUsuario(idUsuario).then(data => {

        if (data.status === 200) {
            alert(data.message);
            window.location.reload();
        } else {
            alert(data.message);
        }
    });
});

btnEditar.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuario');
    localStorage.removeItem('crear');

    if (idUsuario) {
        localStorage.setItem('modificar', true);
        window.location.href = 'modificarCrearUsuario.html';
    } else {
        alert('Debe seleccionar un usuario');
    }
});

btnCrear.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuario');
    localStorage.removeItem('modificar');

    if (!idUsuario) {
        window.location.href = 'modificarCrearUsuario.html';
        localStorage.setItem('crear', true);
    } else {
        alert('Debe deseleccionar el usuario');
    }
});

// Ejecución de funciones
_Init();