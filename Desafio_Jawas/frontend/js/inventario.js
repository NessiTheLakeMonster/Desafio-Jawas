import { getInventario, getNombreComponente } from "./http/http_inventario.js";

const tablaInventario = document.getElementById('tablaInventario');

export function cabeceraTablaInventario() {
    let cabecera = document.createElement('tr');

    let headers = ['Número Inventario', 'Nombre Componente', 'Cantidad'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaInventario.appendChild(cabecera);
}

export function crearFilasTablaInventario(data) {
    return data.map(producto => `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre_componente}</td>
            <td>${producto.cantidad}</td>
        </tr>
    `).join('');
}

export function mostrarNombreComponente(idComponente) {
    getNombreComponente(idComponente).then(data => {
        return data.nombre;
    });
}

export async function _Init() {
    getInventario().then(data => {
        cabeceraTablaInventario();
        tablaInventario.innerHTML += crearFilasTablaInventario(data);
    });
}

_Init();