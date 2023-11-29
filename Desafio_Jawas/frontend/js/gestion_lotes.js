import { getUsuarios } from './http/http_gestionUsuarios.js'

const latitud = localStorage.getItem('latitud')
const longitud = localStorage.getItem('longitud')

const tablaLotes = document.getElementById('tablaLotes')

function move() {
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

// function cabeceraTabla

let cont = 1

function llenarTablaLotes() {
    let tr = `
                <tr>
                    <td>${cont}</td>
                    <td>${usuario.nombre}</td>
                    <td>${latitud + ', ' + longitud}</td>
                    <td></td>
                    <td></td>
                </tr>
            `
    cont++;

    tablaLotes.innerHTML += tr
}

window.onload = function () {
    move(),
    llenarTablaLotes()
};