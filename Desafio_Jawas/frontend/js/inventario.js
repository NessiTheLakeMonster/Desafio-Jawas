import { getInventario, modificarInventario } from "./http/http_inventario.js";

// Variables del HTML
const tablaInventario = document.getElementById('tablaInventario');

// Botones
const btnGuardar = document.getElementById('btnGuardar');

// Funciones
export function cabeceraTablaInventario() {
    let cabecera = document.createElement('tr');

    let headers = ['', 'Número Inventario', 'Nombre Componente', 'Cantidad'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaInventario.appendChild(cabecera);
}

export function crearFilasTablaInventario(data) {
    return data.map(inventario => `
        <tr>
            <td><input class="checkbox-inventario" type="checkbox" name="idUsuario" value="${inventario.id}" data-id="${inventario.id}"></td>
            <td>${inventario.id}</td>
            <td>${inventario.nombre_componente}</td>
            <td>
                <button class="decrease-button" data-id="${inventario.id}">-</button>
                ${inventario.cantidad}
                <button class="increase-button" data-id="${inventario.id}">+</button>
            </td>
        </tr>
    `).join('');
}

export async function _Init() {
    getInventario().then(data => {
        cabeceraTablaInventario();
        tablaInventario.innerHTML += crearFilasTablaInventario(data);

        let checkboxes = document.querySelectorAll('.checkbox-inventario');
        let decreaseButtons = document.querySelectorAll('.decrease-button');
        let increaseButtons = document.querySelectorAll('.increase-button');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    checkboxes.forEach(box => {
                        if (box !== this) {
                            box.disabled = this.checked;
                        }
                    });
                    localStorage.setItem('idInventario', this.value);
                    console.log(localStorage.getItem('idInventario'));
                } else {
                    localStorage.removeItem('idInventario');
                    location.reload();
                }
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener('click', function () {
                let idInventario = this.getAttribute('data-id');
                if (idInventario && localStorage.getItem('idInventario') == idInventario) {
                    let cantidad = parseInt(this.nextSibling.textContent);
                    cantidad--;
                    this.nextSibling.textContent = cantidad;
                    let datos = { cantidad: cantidad };
                    modificarInventario(idInventario, datos).then(response => {
                        console.log(response); // Imprime la respuesta de la API
                    });
                }
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', function () {
                let idInventario = this.getAttribute('data-id');
                if (idInventario && localStorage.getItem('idInventario') == idInventario) {
                    let cantidad = parseInt(this.previousSibling.textContent);
                    cantidad++;
                    this.previousSibling.textContent = cantidad;
                    let datos = { cantidad: cantidad };
                    modificarInventario(idInventario, datos).then(response => {
                        console.log(response); // Imprime la respuesta de la API
                    });
                }
            });
        });
    });
}

// Eventos
/* btnGuardar.addEventListener('click', () => {
    modificarInventario().then(data => {
        if (data.status == 200) {
            alert('Modificado correctamente');
            window.location.reload();
        } else {
            alert('Error al modificar');
        }
    });

}); */

// Ejecución de las funciones
_Init();