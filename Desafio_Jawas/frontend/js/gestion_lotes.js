/**
 * @author Jaime Ortega
 */

import { mostrarLotes, mostrarLote, cancelarLote } from './http/http_gestionLotes.js'
import { getUsuarioById } from './http/http_gestionUsuarios.js'

let idUsuarioGuardado = sessionStorage.getItem('userId')
let idUsuario = JSON.parse(idUsuarioGuardado)

let latitud = sessionStorage.getItem('latitud')
let longitud = sessionStorage.getItem('longitud')

let mandarLote = document.getElementById('mandarLote')
let tablaLotes = document.getElementById('tablaLotes')
let cancelar = document.getElementById('cancelar')

export function move() {
    var elem = document.getElementById("myBar")
    var width = 0
    var id = setInterval(frame, 10)

    function frame() {
        if (width >= 100) {
            clearInterval(id)
        } else {
            width++
            elem.style.width = width + "%"
            elem.innerHTML = width + "%"
        }
    }
}

export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr')
    let columnas = ['', 'Nº LOTE', 'USUARIO', 'LUGAR RECOGIDA', 'ENTREGADO', 'CANCELADO']

    columnas.forEach(col => {
        let th = document.createElement('th')
        th.textContent = col
        cabecera.appendChild(th)
    })

    tablaLotes.appendChild(cabecera);
}

export function llenarTablaLotes(data, dataUser) {
    return data.map(lote => `
                <tr>
                    <td><input class="checkbox-lote" type="checkbox" name"lote" value="${lote.id}"</td>
                    <td>${lote.id}</td>
                    <td>${dataUser.nombre}</td>
                    <td>${lote.lugar_recogida}</td>
                    <td>${lote.entregado}</td>
                    <td>${lote.cancelado}</td>
                </tr>
            `).join('')
}

export function _Init() {
    getUsuarioById(idUsuario).then(dataUser => {
        mostrarLotes(idUsuario).then(data => {
            cabeceraTabla(data)
            tablaLotes.innerHTML += llenarTablaLotes(data, dataUser)

            let checkboxes = document.querySelectorAll('.checkbox-lote');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    if (this.checked) {

                        checkboxes.forEach(otherCheckbox => {
                            if (otherCheckbox !== checkbox) {
                                otherCheckbox.checked = false;
                            }
                        });
                        // Si el checkbox está seleccionado, guardar el ID en el localStorage
                        localStorage.setItem('loteIdGestion', this.value);
                    } else {
                        // Si el checkbox no está seleccionado, eliminar el ID del localStorage
                        localStorage.removeItem('loteIdGestion');
                    }
                });
            });
        })
            .catch(error => console.error('Error:', error))
    })
        .catch(error => console.error('Error:', error))


}
_Init()
