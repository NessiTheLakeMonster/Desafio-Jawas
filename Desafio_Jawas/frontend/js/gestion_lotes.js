import { mostrarLotes } from './http/http_gestionLotes.js'

const latitud = localStorage.getItem('latitud')
const longitud = localStorage.getItem('longitud')

const mandarLote = document.getElementById('mandarLote')
const tablaLotes = document.getElementById('tablaLotes')
const cancelarLote = document.getElementById('cancelarLote')

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

    tablaLotes.appendChild(cabecera);
}

export function llenarTablaLotes(data) {
    return data.map(lote => `
                <tr>
                    <td>${lote.id}</td>
                    <td>${lote.idUsuario}</td>
                    <td>${latitud + ', ' + longitud}</td>
                    <td>${lote.entregado}</td>
                    <td>${lote.cancelado}</td>
                </tr>
            `).join('')
}

// export function _Init() {
//     mostrarLotes().then(data => {
//         cabeceraTabla(data)
//         tablaLotes.innerHTML += llenarTablaLotes(data)
//     })

    mandarLote.addEventListener('click', async function () {
        let data = await mostrarLotes(idUsuario)

        tablaLotes.innerHTML = ''

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data]

            tablaLotes.innerHTML += llenarTablaLotes(data)
        } 
        console.log('CLICASTE')
    })
// }
// _Init()