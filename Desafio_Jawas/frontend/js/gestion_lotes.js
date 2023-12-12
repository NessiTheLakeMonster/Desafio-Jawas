/**
 * @author Jaime Ortega
 */

import { mostrarLotes, mostrarEntregados, mostrarLote, mandarLote, cancelarLote } from './http/http_gestionLotes.js'
import { getUsuarioById } from './http/http_gestionUsuarios.js'

sessionStorage.setItem('userId', '1')
let idUsuarioGuardado = sessionStorage.getItem('userId')
let idUsuario = JSON.parse(idUsuarioGuardado)

let latitud = sessionStorage.getItem('latitud')
let longitud = sessionStorage.getItem('longitud')

let tablaLotes = document.getElementById('tablaLotes')
let msgMandar = document.getElementById('msgMandar')
let msgCancelar = document.getElementById('msgCancelar')

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

    tablaLotes.appendChild(cabecera)
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

export async function _Init() {
    try {
        getUsuarioById(idUsuario).then(dataUser => {
            mostrarLotes(idUsuario).then(data => {
                cabeceraTabla(data)
                tablaLotes.innerHTML += llenarTablaLotes(data, dataUser)

                let checkboxes = document.querySelectorAll('.checkbox-lote')
                let btnCancelarLote = document.getElementById('cancelar')
                let btnMandarLote = document.getElementById('mandarLote')

                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            checkboxes.forEach(otherCheckbox => {
                                if (otherCheckbox !== checkbox) {
                                    otherCheckbox.checked = false
                                }
                            })

                            // Si el checkbox está seleccionado, guardar el ID en el sessionStorage
                            sessionStorage.setItem('loteIdGestionGuardado', this.value)
                        } else {
                            sessionStorage.removeItem('loteIdGestionGuardado')
                        }
                    })
                })

                btnCancelarLote.addEventListener('click', async function () {
                    let loteIdGestion = sessionStorage.getItem('loteIdGestionGuardado')

                    if (loteIdGestion) {
                        let response = await cancelarLote(loteIdGestion)

                        if (response.success) {
                            msgCancelar.textContent = 'Lote ' + loteIdGestion + ' cancelado correctamente'
                        } else {
                            msgCancelar.textContent = 'lote: ' + loteIdGestion + ' ya está cancelado'
                        }
                    } else {
                        console.log('No hay Nº de lote seleccionado.')
                    }
                })

                btnMandarLote.addEventListener('click', async function () {
                    let loteIdGestion = sessionStorage.getItem('loteIdGestionGuardado')

                    if (loteIdGestion) {
                        let response = await mandarLote(loteIdGestion)

                        if (response.success) {
                            msgMandar.textContent = 'Lote ' + loteIdGestion + ' mandado correctamente'
                        } else {
                            msgMandar.textContent = 'Lote ' + loteIdGestion + ' ya está mandado'
                        }
                    } else {
                        console.log('No hay Nº de lote seleccionado.')
                    }
                })
            }).catch(error => console.error('Error al obtener lotes:', error))
        }).catch(error => console.error('Error al obtener usuario:', error))
    } catch (error) {
        console.error('Error en la función _Init:', error)
    }
}

_Init();

