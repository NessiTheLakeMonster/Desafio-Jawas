//Importaciones
import { getLotes, getLote } from "./http/http_despieceLote.js";

//Tabla Lotes Entregados
let tablaLoteClasificador = document.getElementById("tablaLoteClasificador");

// Mensaje de error de lote no seleccionado para desguazar
let msgErrorLote = document.getElementById("msgErrorLote");

//Botón de Desguazar lote
const btnDesguazar = document.getElementById("btnDesguazar");

//Barra de búsqueda
let buscador = document.getElementById("buscador");
let btnBuscar = document.getElementById("btnBuscar");
// Mensaje de error de lote no encontrado en la búsqueda
let msgErrorBuscar = document.getElementById("msgErrorBuscar");


/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de lotes entregados
 */

export function cabeceraTablaLotes(data) {
    let cabecera = document.createElement('tr');
    let headers = ['', 'Nº DE LOTE', 'USUARIO', 'LONGITUD','LATITUD', 'ENTREGADO', 'CANCELADO'];
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });
    tablaLoteClasificador.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de lotes entregados
 */

export function filaTablaLotes(data) {
    return data.map(lote => `
        <tr>
            <td><input class="checkbox-lote" type="checkbox" name="lote" value="${lote.id}"></td>
            <td>${lote.id}</td>
            <td>${lote.nombre} ${lote.apellido}</td>
            <td>${lote.longitud}</td>
            <td>${lote.latitud}</td>
            <td>${lote.entregado}</td>
            <td>${lote.cancelado}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de mostrar los lotes entregados en la tabla
 */

function _Init() {
    getLotes()
        .then(data => {

            if (data.status === 401) {
                window.location.href = "../html/noPermisos.html";
            }

            tablaLoteClasificador.innerHTML = "";
            cabeceraTablaLotes(data);
            tablaLoteClasificador.innerHTML += filaTablaLotes(data);

            let checkboxes = document.querySelectorAll('.checkbox-lote');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        checkboxes.forEach(otherCheckbox => {
                            if (otherCheckbox !== checkbox) {
                                otherCheckbox.checked = false;
                            }
                        });
                        localStorage.setItem('loteId', this.value);
                    } else {
                        localStorage.removeItem('loteId');
                    }
                });
            });
        });
}

/**
 * @author Patricia Mota
 * @summary Botón de buscar lote en la barra de búsqueda, si no se introduce ningún id, se mostrarán todos los lotes
 */

//Botón de buscar
btnBuscar.addEventListener('click', async function () {
    
    let id = buscador.value;

    if (id === "") {
        let data = await getLotes();
        tablaLoteClasificador.innerHTML = "";
        cabeceraTablaLotes(data);
        tablaLoteClasificador.innerHTML += filaTablaLotes(data);
    } else {
        let data = await getLote(id);
        tablaLoteClasificador.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTablaLotes(data);
            tablaLoteClasificador.innerHTML += filaTablaLotes(data);
        } else {
            msgErrorBuscar.textContent = "El lote que buscas no existe, selecciona un lote de la lista";
            msgErrorBuscar.style.color = "red";
            _Init();
        }
    }
});

/**
 * @author Patricia Mota
 * @summary Tecla enter en la barra de búsqueda
 */

//TECLA ENTER
buscador.addEventListener('keyup', async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnBuscar.click();
    }
});

/**
 * @author Patricia Mota
 * @summary Botón de desguazar lote, si no se selecciona ningún lote, mostrará un mensaje de error
 */

//Botón de Desguazar lote
btnDesguazar.addEventListener('click', function () {
    let loteId = localStorage.getItem('loteId');

    if (loteId) {
        window.location.href = './despieceLoteDetalles.html';
    } else {
        msgErrorLote.textContent = "Debes seleccionar un lote de la lista";
        msgErrorLote.style.color = "red";

    }
});

_Init();

