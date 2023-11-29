//Importaciones
import { getLotes, getLote } from "./http/http_despieceLote.js";

//tabla
let tablaLoteClasificador = document.getElementById("tablaLoteClasificador");

// Mensaje de error de lote no encontrado
let msgErrorLote = document.getElementById("msgErrorLote");

//Botón de Desguazar lote
const btnDesguazar = document.getElementById("btnDesguazar");

//barra de busqueda
let searchBar = document.getElementById("searchBar"); 
let searchButton = document.getElementById("searchButton");

export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');

    let th = document.createElement('th');
    cabecera.appendChild(th);

    Object.keys(data[0]).forEach(key => {
        if (data[0][key] !== undefined) {
            let th = document.createElement('th');
            th.textContent = key.toUpperCase();
            cabecera.appendChild(th);
        }
    });

    tablaLoteClasificador.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(lote => `
        <tr>
            <td><input class="checkbox-lote" type="checkbox" name="lote" value="${lote.id}"></td>
            <td>${lote.id}</td>
            <td>${lote.id_usuario}</td>
            <td>${lote.lugar_recogida}</td>
            <td>${lote.entregado}</td>
            <td>${lote.cancelado}</td>
            <td>${lote.created_at}</td>
            <td>${lote.updated_at}</td>
        </tr>
    `).join('');
}

export function _Init() {
    getLotes().then(data => {
        cabeceraTabla(data);
        tablaLoteClasificador.innerHTML += createTableRows(data);

        let checkboxes = document.querySelectorAll('.checkbox-lote');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    // Si el checkbox está seleccionado, guardar el ID en el localStorage
                    localStorage.setItem('loteId', this.value);
                } else {
                    // Si el checkbox no está seleccionado, eliminar el ID del localStorage
                    localStorage.removeItem('loteId');
                }
            });
        });
    });
}

//Botón de buscar
searchButton.addEventListener('click', async function() {
    let id = searchBar.value;
    let data = await getLote(id);

    tablaLoteClasificador.innerHTML = "";

    if (data && data.id !== undefined) {
        // los datos son un array
        data = Array.isArray(data) ? data : [data];

        cabeceraTabla(data);//Cabecera
        tablaLoteClasificador.innerHTML += createTableRows(data);//filas

    } else {
        msgErrorLote.textContent = "El lote que buscas no existe, selecciona un lote de la lista";
        // Ejecución de funciones
        _Init();

    }
});

//TECLA ENTER
searchBar.addEventListener('keyup', async function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});

//Botón de Desguazar lote
btnDesguazar.addEventListener('click', function() {
    let loteId = localStorage.getItem('loteId');

    if (loteId) {
        window.location.href = './despieceLoteDetalles.html';
    } else {
        alert('Por favor, selecciona un lote antes de continuar');
    }
});

// Ejecución de funciones
_Init();

