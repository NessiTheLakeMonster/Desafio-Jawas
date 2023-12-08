//Importaciones
import { getComponente, getComponentes, addComponente } from "./http/http_componentes.js";
import { validarHardware,  validarNombreHardware} from "./utils/validaciones.js";

//Tabla de componentes 
let tablaComponentes = document.getElementById("tablaComponentes");

//Botón añadir componente
let btnAddComponente = document.getElementById("btnGuardarComponente");

//Datos del componente
const nombre = document.getElementById("nombreComponente");
const hardware = document.getElementById("hardware");

let msgErrorNombre = document.getElementById("msgErrorNombre");
let msgErrorHardware = document.getElementById("msgErrorHardware");

//barra de busqueda
let buscador = document.getElementById("buscador");
let btnBuscar = document.getElementById("btnBuscar");
let msgErrorBuscar = document.getElementById("msgErrorBuscar");

//mensaje de error
let msgErrorComponente = document.getElementById("msgErrorComponente");
let msgComponenteInsertado = document.getElementById("msgComponenteInsertado");

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de componentes
 */

export function cabeceraTablaComponentes(data) {
    let cabecera = document.createElement('tr');
    let headers = ['ID','NOMBRE', 'HARDWARE'];

    headers.forEach(header => {
         let th = document.createElement('th');
         th.textContent = header;
         cabecera.appendChild(th);

    });

    tablaComponentes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de componentes
 */

export function filaComponentes(data) {
    return data.map(componente => `
        <tr>
            <td>${componente.id}</td>
            <td>${componente.nombre}</td>
            <td>${componente.hardware}</td>

        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de guardar los datos del componente
 */

function guardarComponente() {

    let datos = {
        nombre: nombre.value,
        hardware: hardware.value,
    };

    return datos;
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de mostrar la tabla de los componentes
 */


export function _Init(){
    getComponentes()
        .then(data => {
            cabeceraTablaComponentes(data);
            tablaComponentes.innerHTML += filaComponentes(data);
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * @author Patricia Mota
 * @summary Botón que se encarga de añadir un componente
 */


btnAddComponente.addEventListener('click',  function(e) {

    let datos = guardarComponente();
    addComponente(datos)

        .then(data => {
        
            if (data.nombre) {
                msgErrorComponente.innerHTML = "Componente añadido con éxito";
                msgErrorComponente.style.color = "green";
        
            } else {
                msgErrorComponente.innerHTML = "Error al añadir el componente";
                msgErrorComponente.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
        });
});

/**
 * @author Patricia Mota
 * @summary Botón que se encarga de buscar un componente
 */

btnBuscar.addEventListener('click', async function() {
    let id = buscador.value;

    if (id === "") {
        let data = await getComponentes();
        tablaComponentes.innerHTML = "";
        cabeceraTablaComponentes(data);
        tablaComponentes.innerHTML += filaComponentes(data);
    } else {
        let data = await getComponente(id);
        tablaComponentes.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTablaComponentes(data);
            tablaComponentes.innerHTML += filaComponentes(data);
        } else {
            msgErrorBuscar.textContent = "El componente que buscas no existe, selecciona un componente de la lista";
            msgErrorBuscar.style.color = "red";
            _Init();
        }
    }
});

/**
 * @author Patricia Mota
 * @summary Botón de enter que se encarga de buscar un componente
 */

buscador.addEventListener('keyup', async function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnBuscar.click();
    }
});

function limpiarErrores() {
    msgErrorNombre.textContent = "";
    msgErrorHardware.textContent = "";
}

function validar() {
    limpiarErrores();
    var esValido = true;

    if (!validarNombreHardware(nombre, msgErrorNombre)) {
        esValido = false;
    }
    if (!validarHardware(hardware, msgErrorHardware)) {
        esValido = false;
    }

    return esValido;
}

_Init();
