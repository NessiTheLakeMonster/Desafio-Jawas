import { getInventario } from "./http/http_inventario.js";

const tablaInventario = document.getElementById('tablaInventario');

export function cabeceraTablaInventario() {
    let cabecera = document.createElement('tr');

    let headers = ['ID', 'ID Componente', 'Cantidad', 'created_at', 'updated_at'];

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
            <td>${producto.id_componente}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.created_at}</td>
            <td>${producto.updated_at}</td>
        </tr>
    `).join('');
}

export function _Init() {
    getInventario().then(data => {
        cabeceraTablaInventario();
        tablaInventario.innerHTML += crearFilasTablaInventario(data);
    });
}

_Init();