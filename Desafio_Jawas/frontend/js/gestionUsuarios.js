import { getUsuarios, deleteUsuario, getUsuarioById } from "./http/http_gestionUsuarios.js";

// Variables del HTML
const tablaUsuarios = document.getElementById('tablaUsuarios');

// Botones
const btnEliminar = document.getElementById('btnBorrar');
const btnEditar = document.getElementById('btnModificar');
const btnCrear = document.getElementById('btnAgregar');

localStorage.removeItem('idUsuarioSeleccionado');

// Funciones 
export function cabeceraTablaUsuarios() {
    let cabecera = document.createElement('tr');

    let headers = ['', 'ID', 'Foto de Perfil', 'Nombre', 'Apellido', 'Email'];

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
    btnEditar.disabled = true;

    getUsuarios().then(data => {
        tablaUsuarios.innerHTML = "";
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
                    localStorage.setItem('idUsuarioSeleccionado', this.value);
                    guardarUsuarioSeleccionado(this.value);
                    btnEditar.disabled = false;
                } else {
                    localStorage.removeItem('idUsuarioSeleccionado');
                    localStorage.removeItem('usuarioSeleccionado');
                }
            });
        });
    });
}

// Eventos de botones
btnEliminar.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuarioSeleccionado');

    console.log(idUsuario);

    deleteUsuario(idUsuario).then(data => {

        if (data.status === 200) {
            alert(data.message);
            //window.location.reload();
            _Init();
        } else {
            alert(data.message);
        }
    });
});

btnEditar.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuarioSeleccionado');
    localStorage.removeItem('crear');

    if (idUsuario) {
        localStorage.setItem('modificar', true);
        window.location.href = 'modificarCrearUsuario.html';
    } else {
        alert('Debe seleccionar un usuario');
    }
});

btnCrear.addEventListener('click', function () {
    let idUsuario = localStorage.getItem('idUsuarioSeleccionado');
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