/**
 * @author Jaime Ortega
 */

import { mostrarLotes, mostrarLote, cancelarLote } from './http/http_gestionLotes.js'

let idUsuario = sessionStorage.getItem('idUsuario')
console.log(idUsuario)
let latitud = localStorage.getItem('latitud')
let longitud = localStorage.getItem('longitud')

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

export function llenarTablaLotes(data) {
    return data.map(lote => `
                <tr>
                    <td><input class="checkbox-lote" type="checkbox" name"lote" value="${lote.id}"</td>
                    <td>${lote.id}</td>
                    <td>${lote.idUsuario}</td>
                    <td>${latitud + ', ' + longitud}</td>
                    <td>${lote.entregado}</td>
                    <td>${lote.cancelado}</td>
                </tr>
            `).join('')
}

export function _Init() {
    mostrarLotes(idUsuario).then(data => {
        cabeceraTabla(data)
        tablaLotes.innerHTML += llenarTablaLotes(data)
    })
    .catch(error => console.error('Error:', error))

    let checkboxes = document.querySelectorAll('.checkbox-lote')
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {

                checkboxes.forEach(otraCheckbox => {
                    if (otraCheckbox !== checkbox) {
                        otraCheckbox.checked = false;
                    }
                });
                // Si el checkbox está seleccionado, guardar el ID en el localStorage
                localStorage.setItem('usuarioId', this.value);
            } else {
                // Si el checkbox no está seleccionado, eliminar el ID del localStorage
                localStorage.removeItem('usuarioId');
            }
        })
    })

    
}
_Init()

    // mandarLote.addEventListener('click', async function () {
    //     let data = await mostrarLotes()

    //     tablaLotes.innerHTML = ''

    //     if (data && data.id !== undefined) {
    //         data = Array.isArray(data) ? data : [data]

    //         tablaLotes.innerHTML += llenarTablaLotes(data)
    //     } 
    //     console.log('CLICASTE')
    // })
