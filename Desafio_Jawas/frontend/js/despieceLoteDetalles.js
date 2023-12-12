//Importaciones
import { getLoteComponentes, desguaceLote, getComponentes } from "./http/http_despieceLote.js";
import { validarDescripcion, validarCantidad } from "./utils/validaciones.js";

//Variables de los campos a rellenar
let descripcionComponente = document.getElementById("descripcionComponente");
let cantidadComponente = document.getElementById("cantidadComponente");

//Mensajes de error
let msgComponenteInsertado = document.getElementById("msgComponente");
let msgExito = document.getElementById("msgExito");
let msgErrorCantidad = document.getElementById("msgErrorCantidad");
let msgErrorDescripcion = document.getElementById("msgErrorDescripcion");

//Tabla de información del lote
let tablaInfoLotes = document.getElementById("tablaInfoLotes");

//Botón de seleccionar otro lote y volver a la anterior pantalla
const btnSeleccionarOtroLote = document.getElementById("btnOtroLote");

//Botón de añadir componente
const btnAñadirComponente = document.getElementById("btnAñadirComponente");

//Select de componentes
let select = document.getElementById('selectComponentes');

/**
 * @author Patricia Mota
 * @summary Función que se encarga de obtener los componentes de la base de datos para el select
 */

getLoteComponentes()
    .then(componentes => {

        componentes.forEach(componente => {
            let elementoOpcion = document.createElement('option');
            elementoOpcion.value = componente.id;
            elementoOpcion.text = componente.nombre;
            select.appendChild(elementoOpcion);
        });
    })
    .catch(error => console.error('Error:', error));


/**
 * @author Patricia Mota
 * @summary Función que se encarga de obtener los datos ingresados para mandarlos a la api
 */

function cogerComponente() {
    let datos = {
        idComponente: parseInt(select.value),
        descripcion: descripcionComponente.value,
        cantidad: cantidadComponente.value
    };

    return datos;
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de información del lote
 */

export function cabeceraTablaDesguace(data) {
    let cabecera = document.createElement('tr');
    let headers = ['COMPONENTE', 'DESCRIPCIÓN', 'CANTIDAD'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaInfoLotes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de información del lote
 */

export function filaTablaInfoLote(data) {
    return data.map(info_lote => `
        <tr>
            <td>${info_lote.nombre}</td>
            <td>${info_lote.descripcion}</td>
            <td>${info_lote.cantidad}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de mostrar la información del lote seleccionado anteriormente en la tabla
 */

export function _Init() {
    let idLote = localStorage.getItem('loteId');
    getComponentes(idLote)
        .then(data => {

            if (data.status === 401) {
                window.location.href = "../html/noPermisos.html";
            }
            
            tablaInfoLotes.innerHTML = '';
            cabeceraTablaDesguace();
            tablaInfoLotes.innerHTML += filaTablaInfoLote(data);
        })
        .catch(error => console.error('Error:', error));
}

/**
 * @author Patricia Mota
 * @summary Botón de añadir componentes a la bbdd
 */

btnAñadirComponente.addEventListener('click', function (e) {
    e.preventDefault();
    if (!validar()) {
        msgComponenteInsertado.innerHTML = "Los datos ingresados no son válidos, por favor revise los campos";
        msgComponenteInsertado.style.color = "red";
        return;
    } else {
        msgComponenteInsertado.innerHTML = "";
    }

    let datos = cogerComponente();

    desguaceLote(datos)
        .then(data => {
            if (data.id) {
                msgExito.innerHTML = "Componente añadido con éxito";
                msgExito.style.color = "green";
                document.getElementById("descripcionComponente").value = "";
                document.getElementById("cantidadComponente").value = "";
                _Init();
            } else {
                msgComponenteInsertado.innerHTML = "El componente no se pudo añadir, complete los campos";
                msgComponenteInsertado.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
        });
});

/**
 * @author Patricia Mota
 * @summary Botón de seleccionar otro lote y volver a la anterior pantalla
 */

btnSeleccionarOtroLote.addEventListener('click', function () {
    localStorage.removeItem('loteId');
    window.location.href = 'despieceLote.html';
});


function limpiarErrores() {
    msgErrorDescripcion.textContent = "";
    msgErrorCantidad.textContent = "";
}


function validar() {
    limpiarErrores();
    var esValido = true;

    if (!validarDescripcion(descripcionComponente, msgErrorDescripcion)) {
        esValido = false;
    }

    if (!validarCantidad(cantidadComponente, msgErrorCantidad)) {
        esValido = false;
    }

    return esValido;
}

_Init();