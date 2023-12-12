//Importaciones
import { mandarLote, getLotesEntregados, getLoteEntregado, cancelarLote } from './http/http_lotes.js'

let usuario = localStorage.getItem('usuarioId')
let idLoteCreado = localStorage.getItem('idLote')

//Barra de búsqueda
let buscador = document.getElementById("buscador");
let btnBuscar = document.getElementById("btnBuscar");
// Mensaje de error de lote no encontrado en la búsqueda
let msgErrorBuscar = document.getElementById("msgErrorBuscar");

//Mensaje de lote
let msgLote = document.getElementById('msgLote')

//Botón Mandar lote
let btnMandarLote = document.getElementById('btnMandarLote')
//Botón Cancelar lote
let btnCancelarLote = document.getElementById('btnCancelarLote')

//Tabla lotes
let tablaLotes = document.getElementById('tablaLotes')


/**
 * @author Jaime Ortega
 * @summary Función que se encarga de crear la barra de progreso
 */

export function move() {
    var elem = document.getElementById("myBar")
    var width = 0
    var id = setInterval(frame, 10)

    function frame() {
        if (width >= 100) {
            clearInterval(id)
            _Init()
        } else {
            width++
            elem.style.width = width + "%"
            elem.innerHTML = width + "%"
        }
    }
}


/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de lotes entregados
 */

export function cabeceraTablaLotesColaborador(data) {
    let cabecera = document.createElement('tr');
    let headers = ['Nº DE LOTE', 'USUARIO', 'LONGITUD', 'LATITUD', 'ENTREGADO', 'CANCELADO'];
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });
    tablaLotes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de lotes entregados
 */

export function filaTablaLotesColaborador(data) {
    return data.map(lote => `
        <tr>
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
 * @summary Función que se encarga de crear la tabla de lotes entregados
 */

export function _Init() {
    getLotesEntregados(usuario)
        .then(data => {
            tablaLotes.innerHTML = "";
            cabeceraTablaLotesColaborador(data);
            tablaLotes.innerHTML += filaTablaLotesColaborador(data);
        });
}

/**
 * @author Patricia Mota ft. Inés Barrera
 * @summary Boton de mandar lote
 */

btnMandarLote.addEventListener('click', async function () {

    let latitud = localStorage.getItem('latitud')
    let longitud = localStorage.getItem('longitud')

    let datos = {
        id_usuario: usuario,
        latitud: latitud,
        longitud: longitud
    }

    mandarLote(datos)
        .then(data => {
            console.log(data)
            console.log(usuario)
            if (data.status === 200) {
                move()
                msgLote.textContent = 'Lote enviado correctamente'
                msgLote.style.color = 'green'
            } else {
                msgLote.textContent = 'Error al crear el lote'
                msgLote.style.color = 'red'
            }

        });

    localStorage.removeItem('latitud')
    localStorage.removeItem('longitud')

});

/**
 * @author Patricia Mota ft. Inés Barrera
 * @summary Boton de cancelar lote
 */

btnCancelarLote.addEventListener('click', async function () {

    console.log(idLoteCreado)

    cancelarLote(localStorage.getItem('idLote')).then(data => {
        console.log(data)

        if (data.status === 200) {
            msgLote.textContent = 'Lote cancelado correctamente'
            msgLote.style.color = 'yellow'
            localStorage.removeItem('idLote')
            _Init()
        } else {
            msgLote.textContent = 'Error al cancelar el lote'
            msgLote.style.color = 'red'
        }
    });


});

/**
 * @author Patricia Mota ft. Inés Barrera
 * @summary Boton de buscar lote
 */

btnBuscar.addEventListener('click', async function () {

    let id = buscador.value;

    if (id === "") {
        let data = await getLotesEntregados(usuario);
        tablaLotes.innerHTML = "";
        cabeceraTablaLotesColaborador(data);
        tablaLotes.innerHTML += filaTablaLotesColaborador(data);

    } else {

        let data = await getLoteEntregado(id, usuario);
        tablaLotes.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTablaLotesColaborador(data);
            tablaLotes.innerHTML += filaTablaLotesColaborador(data);
            msgErrorBuscar.textContent = "";
        } else {
            msgErrorBuscar.textContent = "El lote que buscas no existe, selecciona un lote de la lista";
            msgErrorBuscar.style.color = "red";
            _Init();
        }
    }
});

//TECLA ENTER
buscador.addEventListener('keyup', async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnBuscar.click();
    }
});

_Init()