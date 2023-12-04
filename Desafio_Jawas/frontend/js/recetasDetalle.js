import {addIngrediente, getJoyas, getComponentes, getIngredientesNuevos } from "./http/http_recetas.js";

let cantidadComponente = document.getElementById("cantidadComponente");

// Mensaje de componente insertado
let msgComponenteInsertado = document.getElementById("msgExito");
let msgJoyaInsertada = document.getElementById("msgJoya");

//tabla de ingredientes
let tablaIngredientes = document.getElementById("tablaIngredientes");

//Botón de añadir componente
const btnAñadirComponente = document.getElementById("btnAñadirComponente");

//Botón de ver recetas 
const btnRecetas = document.getElementById("btnRecetas");

//Botón de volver a seleccionar joya
const btnElegirJoya = document.getElementById('btnElegirJoya');

//volver a la pantalla anterior
btnRecetas.addEventListener('click', function() {
    window.location.href = 'recetas.html';
});

//select tipos de joyas
let selectJoya = document.getElementById('selectTiposJoyas');

//select componentes
let selectComponentes = document.getElementById('selectComponentes');

//obtenemos los tipos de joyas de la bbdd
getJoyas()
    .then(joyas => {

        joyas.forEach(joya => {
            let elementoOpcion = document.createElement('option');
            elementoOpcion.value = joya.id;
            elementoOpcion.text = joya.nombre;
            selectJoya.appendChild(elementoOpcion);

        });

    })
    .catch(error => console.error('Error:', error));

// Obtenemos los componentes de la base de datos
getComponentes()
    .then(componentes => {

        componentes.forEach(componente => {
            let elementoOpcion = document.createElement('option');
            elementoOpcion.value = componente.id;
            elementoOpcion.text = componente.nombre;
            selectComponentes.appendChild(elementoOpcion);
        });
    })
    .catch(error => console.error('Error:', error));

function cogerIngrediente() {   
    let datos = {
        id_receta: localStorage.getItem('idRecetaNueva'),   
        //TODO: TIPO DE JOYA QUE HACER PORQUE EN Q BBDD SE METE
        idJoya: parseInt(selectJoya.value),
        id_componente: parseInt(selectComponentes.value),
        cantidad: cantidadComponente.value
    };

    return datos;
}

btnAñadirComponente.addEventListener('click', function(e) {
    e.preventDefault();
    let datos = cogerIngrediente();
    addIngrediente(datos.id_receta, datos)
        .then(data => {
            if (data.id) {
                msgComponenteInsertado.innerHTML = "Componente añadido con éxito";
                msgComponenteInsertado.style.color = "green";
                window.location.reload();
            } else {
                msgComponenteInsertado.innerHTML = "No se ha podido añadir el componente";
                msgComponenteInsertado.style.color = "red";
            }
        })
        .catch(error => console.error('Error:', error));
        console.log(datos);
});

//tabla de ingredientes
export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');
    let headers = ['COMPONENTE','CANTIDAD'];
    // TODO cambir los id de los componentes por los nombres
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaIngredientes.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(ingrediente => `
        <tr>
            <td>${ingrediente.id_componente}</td>
            <td>${ingrediente.cantidad}</td>
        </tr>
    `).join('');
}

export function _Init() {

    let id_recetaNueva = localStorage.getItem('idRecetaNueva');

    getIngredientesNuevos(id_recetaNueva)
        .then(data => {
            cabeceraTabla(data);
            tablaIngredientes.innerHTML += createTableRows(data);
        })
        .catch(error => console.error('Error:', error));

        selectJoya.addEventListener('change', function() {
            selectJoya.disabled = true;
        
            // la joya seleccionad del select
            let joyaSeleccionada = selectJoya.options[selectJoya.selectedIndex].text;
        
            msgJoyaInsertada.innerHTML = "La receta creará un/una: " + joyaSeleccionada;
        });

        btnElegirJoya.addEventListener('click', function() {
            selectJoya.disabled = false;
        });
}

_Init();