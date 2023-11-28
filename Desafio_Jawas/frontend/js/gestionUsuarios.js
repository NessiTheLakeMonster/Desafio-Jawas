import { getUsuarios } from "./http/http_gestionUsuarios.js";

const tablaUsuarios = document.getElementById('tablaUsuarios');

export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');

    Object.keys(data[0]).forEach(key => {
        let th = document.createElement('th');
        th.textContent = key;
        cabecera.appendChild(th);
    });

    tablaUsuarios.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(user => `
        <tr>
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
        cabeceraTabla(data);
        tablaUsuarios.innerHTML += createTableRows(data);
    });
}

/* document.addEventListener('DOMContentLoaded', (event) => {
    const tablaUsuarios = document.getElementById('tablaUsuarios');

    function cabeceraTabla(data) {
        let cabecera = document.createElement('tr');

        Object.keys(data[0]).forEach(key => {
            let th = document.createElement('th');
            th.textContent = key;
            cabecera.appendChild(th);
        });

        tablaUsuarios.appendChild(cabecera);
    }

    function createTableRows(data) {
        return data.map(user => `
            <tr>
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

    function _Init() {
        getUsuarios().then(data => {
            cabeceraTabla(data);
            tablaUsuarios.innerHTML += createTableRows(data);
        });
    }

    _Init();
}); */

// Ejecución de funciones
_Init();