//Importaciones
import { getLoteComponentes, desguaceLote, getComponentes} from "./http/http_despieceLote.js";

let descripcionComponente = document.getElementById("descripcionComponente");
let cantidadComponente = document.getElementById("cantidadComponente");

// Mensaje de componente insertado
let msgComponenteInsertado = document.getElementById("msgExito");

let tablaInfoLotes = document.getElementById("tablaInfoLotes");

//Botón de seleccionar otro lote y volver a la anterior pantalla
const btnSeleccionarOtroLote = document.getElementById("btnOtroLote");

//Botón de añadir componente
const btnAñadirComponente = document.getElementById("btnAñadirComponente");

//Volver a la pantalla anterior
btnSeleccionarOtroLote.addEventListener('click', function() {
    localStorage.removeItem('idLote');
    window.location.href = 'despieceLote.html';
});


let select = document.getElementById('selectComponentes');

// Obtenemos los componentes de la base de datos
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


function cogerComponente() {
    let datos = {
        idComponente: parseInt(select.value),
        descripcion: descripcionComponente.value,
        cantidad: cantidadComponente.value
    };

    return datos;
}

btnAñadirComponente.addEventListener('click', function(e) {
    e.preventDefault();
    let datos = cogerComponente();
    desguaceLote(datos)

        .then(data => {
        
            if (data.id) {
                msgComponenteInsertado.innerHTML = "Componente añadido con éxito";
                msgComponenteInsertado.style.color = "green";
                window.location.reload();
        
            } else {
                msgComponenteInsertado.innerHTML = "Error al añadir el componente";
                msgComponenteInsertado.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
        });
});

//tabla interior lote
export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');
    let headers = ['ID COMPONENTE', 'DESCRIPCIÓN', 'CANTIDAD'];
    // TODO cambir los id de los componentes por los nombres
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaInfoLotes.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(info_lote => `
        <tr>
            <td>${info_lote.idComponente}</td>
            <td>${info_lote.descripcion}</td>
            <td>${info_lote.cantidad}</td>
        </tr>
    `).join('');
}

export function _Init() {
    let idLote = localStorage.getItem('loteId');

    getComponentes(idLote)
    .then(data => {
        cabeceraTabla(data);
        tablaInfoLotes.innerHTML += createTableRows(data);
    })
    .catch(error => console.error('Error:', error));
}

_Init();