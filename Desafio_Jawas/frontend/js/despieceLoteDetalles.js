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

//ID LOTE REGISTRADO
let idLote = localStorage.getItem('idLote');

//Volver a la pantalla anterior
btnSeleccionarOtroLote.addEventListener('click', function() {
    localStorage.removeItem('idLote');
    window.location.href = 'despieceLote.html';
});

// Crear el elemento select
let select = document.createElement('select');
select.id = 'seleccionarComponente';

// Añadir el select al DOM
document.body.appendChild(select);

// Obtener los componentes de la base de datos
getLoteComponentes()
    .then(componentes => {
        // Crear una opción para cada componente
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
        idComponente: select.value,
        descripcion: descripcionComponente.value,
        cantidad: cantidadComponente.value
    };

    return datos;
}

btnAñadirComponente.addEventListener('click', function(e) {
    e.preventDefault();
    desguaceLote(cogerComponente())
        .then(data => {
            console.log(data);
            if (data.status == 200) {
                msgComponenteInsertado.innerHTML = "Componente añadido con éxito";
                msgComponenteInsertado.style.color = "green";
    
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

    let th = document.createElement('th');
    cabecera.appendChild(th);

    Object.keys(data[0]).forEach(key => {
        if (data[0][key] !== undefined) {
            let th = document.createElement('th');
            th.textContent = key.toUpperCase();
            cabecera.appendChild(th);
        }
    });

    tablaInfoLotes.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(info_lote => `
        <tr>
            <td>${info_lote.idComponente}</td>
            <td>${info_lote.descripcion}</td>
            <td>${info_lote.cantidad}</td>
            <td>${info_lote.created_at}</td>
            <td>${info_lote.updated_at}</td>
        </tr>
    `).join('');
}

export function _Init() {
    getComponentes(idLote)
    .then(data => {
        cabeceraTabla(data);
        tablaInfoLotes.innerHTML += createTableRows(data);
    })
    .catch(error => console.error('Error:', error));
}

_Init();