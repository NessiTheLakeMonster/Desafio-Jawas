import { getUsuarios, deleteUsuario } from "./http/http_gestionUsuarios.js";

// Variables del HTML
const tablaUsuarios = document.getElementById('tablaUsuarios');

// Botones
const btnEliminar = document.getElementById('btnBorrar');
const btnEditar = document.getElementById('btnModificar');
const btnCrear = document.getElementById('btnAgregar');

export function cabeceraTabla() {
    let cabecera = document.createElement('tr');

    let headers = ['', 'ID', 'Foto de Perfil', 'Nombre', 'Apellido', 'Email', 'email_verified_at', 'created_at', 'updated_at'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaUsuarios.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(user => `
        <tr>
            <td><input type="checkbox" name="idUsuario" value="${user.id}" id="checkBoxUsuario"></td>
            <td>${user.id}</td>
            <td><img src="${user.fotoPerfil}" width=40 /></td>
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.email}</td>
            <td>${user.email_verified_at}</td>
            <td>${user.created_at}</td>
            <td>${user.updated_at}</td>
        </tr>
    `).join('');
}

export function _Init() {
    getUsuarios().then(data => {
        cabeceraTabla();
        tablaUsuarios.innerHTML += createTableRows(data);

        let checkboxes = document.querySelectorAll('input[name="idUsuario"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    checkboxes.forEach(box => {
                        if (box !== this) {
                            box.disabled = this.checked;
                        }
                    });
                    localStorage.setItem('idUsuario', this.value);
                } else {
                    localStorage.removeItem('idUsuario');
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

// Ejecución de funciones
_Init();