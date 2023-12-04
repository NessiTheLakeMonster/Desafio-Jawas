import { getComponente, getComponentes, addComponente } from "./http/http_componentes.js";

//tabla 
let tablaComponentes = document.getElementById("tablaComponentes");

//botones
let btnAddComponente = document.getElementById("btnGuardarComponente");

//inputs
const nombre = document.getElementById("nombreComponente");
const hardware = document.getElementById("hardware");

//barra de busqueda
let searchBar = document.getElementById("searchBar"); 
let searchButton = document.getElementById("searchButton");

//mensaje de error
let msgErrorComponente = document.getElementById("msgErrorComponente");
let msgComponenteInsertado = document.getElementById("msgComponenteInsertado");

//cabecera de la tabla componentes
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

//tabla componentes
export function createTableRows(data) {
    return data.map(componente => `
        <tr>
            <td>${componente.id}</td>
            <td>${componente.nombre}</td>
            <td>${componente.hardware}</td>

        </tr>
    `).join('');
}

function guardarComponente() {

    let datos = {
        id: id.value,
        nombre: nombre.value,
        hardware: hardware.value,
    };

    return datos;
}

export function _Init(){
    getComponentes()
        .then(data => {
            cabeceraTablaComponentes(data);
            tablaComponentes.innerHTML += createTableRows(data);
        })
        .catch(error => {
            console.log(error);
        });
}

btnAddComponente.addEventListener('click',  function(e) {
    e.preventDefault();
    let datos = guardarComponente();
    addComponente(datos)

        .then(data => {
        
            if (data.nombre) {
                msgErrorComponente.innerHTML = "Componente añadido con éxito";
                msgErrorComponente.style.color = "green";
                window.location.reload();
        
            } else {
                msgErrorComponente.innerHTML = "Error al añadir el componente";
                msgErrorComponente.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
        });

});

//Botón de buscar
searchButton.addEventListener('click', async function() {
    let id = searchBar.value;
    let data = await getComponente(id);

    tablaComponentes.innerHTML = "";

    if (data && data.id !== undefined) {
        // los datos son un array
        data = Array.isArray(data) ? data : [data];

        cabeceraTablaComponentes(data);//Cabecera
        tablaComponentes.innerHTML += createTableRows(data);//filas

    } else {
        msgErrorComponente.textContent = "El componente que buscas no existe, selecciona un componente de la lista";
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

_Init();
