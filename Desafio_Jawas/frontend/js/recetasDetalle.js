//Importaciones
import { addIngrediente, getJoyas, getComponentes, getIngredientesNuevos, recetaNueva } from "./http/http_recetas.js";
import { validarCantidad } from "./utils/validaciones.js";

//Cantidad del componente 
let cantidadComponente = document.getElementById("cantidadComponente");
let msgErrorCantidad = document.getElementById("msgErrorCantidad");

// Mensaje de componente insertado
let msgComponenteInsertado = document.getElementById("msgExito");
let msgJoyaInsertada = document.getElementById("msgJoya");

//tabla de ingredientes
let tablaIngredientes = document.getElementById("tablaIngredientes");

//Botón de añadir componente
const btnAñadirComponente = document.getElementById("btnAñadirComponente");

//Botón de ver recetas 
const btnRecetas = document.getElementById("btnRecetas");

//Botón de crear receta
const btnAñadirJoya = document.getElementById("btnAñadirJoya");

//Botón de crear nueva receta
const btnCrearNuevaReceta = document.getElementById("btnNuevaReceta");

//select tipos de joyas
let selectJoya = document.getElementById('selectTiposJoyas');

//select componentes
let selectComponentes = document.getElementById('selectComponentes');

/**
 * @author Patricia Mota
 * @summary Función que se encarga de obtener los tipos de joyas de la base de datos para el select
 */

getJoyas()
    .then(joyas => {

        let opcionPorDefecto = document.createElement('option');
        opcionPorDefecto.value = '';
        opcionPorDefecto.text = 'Selecciona un tipo de joya';
        selectJoya.appendChild(opcionPorDefecto);

        joyas.forEach(joya => {
            let elementoOpcion = document.createElement('option');
            elementoOpcion.value = joya.id;
            elementoOpcion.text = joya.nombre;
            selectJoya.appendChild(elementoOpcion);
            btnAñadirJoya.disabled = true;
        });

    })
    .catch(error => console.error('Error:', error));

/**
 * @author Patricia Mota
 * @summary Función que se encarga de obtener los componentes de la base de datos para el select
 */

getComponentes()
    .then(componentes => {

        let opcionPorDefecto = document.createElement('option');
        opcionPorDefecto.value = '';
        opcionPorDefecto.text = 'Selecciona un Componente';
        selectComponentes.appendChild(opcionPorDefecto);


        componentes.forEach(componente => {
            let elementoOpcion = document.createElement('option');
            elementoOpcion.value = componente.id;
            elementoOpcion.text = componente.nombre;
            selectComponentes.appendChild(elementoOpcion);
        });
    })
    .catch(error => console.error('Error:', error));

/**
 * @author Patricia Mota
 * @summary Función que se encarga de obtener los datos ingresados para mandarlos a la api
 */

function cogerIngrediente() {
    let datos = {
        id_receta: localStorage.getItem('idRecetaNueva'),
        id_componente: parseInt(selectComponentes.value),
        cantidad: cantidadComponente.value
    };

    return datos;
}
/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de ingredientes de la receta
 */

export function cabeceraTablaIngredientesReceta(data) {
    let cabecera = document.createElement('tr');
    let headers = ['COMPONENTE', 'CANTIDAD'];
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaIngredientes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de ingredientes de la receta
 */

export function filaTablaIngredientesReceta(data) {
    return data.map(ingrediente => `
        <tr>
            <td>${ingrediente.nombre}</td>
            <td>${ingrediente.cantidad}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de mostrar los ingredientes de la receta
 */

export function _Init() {

    let id_recetaNueva = localStorage.getItem('idRecetaNueva');

    selectComponentes.disabled = true;
    cantidadComponente.disabled = true;
    btnAñadirComponente.disabled = true;

    getIngredientesNuevos(id_recetaNueva)
        .then(data => {

            if (data.status === 401) {
                window.location.href = "../html/noPermisos.html";
            }

            tablaIngredientes.innerHTML = '';
            cabeceraTablaIngredientesReceta(data);
            tablaIngredientes.innerHTML += filaTablaIngredientesReceta(data);
        })
        .catch(error => console.error('Error:', error));

    selectJoya.addEventListener('change', function () {
        btnAñadirJoya.disabled = false;
        selectJoya.disabled = true;

        // la joya seleccionad del select
        let joyaSeleccionada = selectJoya.options[selectJoya.selectedIndex].text;

        msgJoyaInsertada.innerHTML = "La receta creará un/una: " + joyaSeleccionada;
        msgJoyaInsertada.style.color = "blue";

    });

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

    let datos = cogerIngrediente();
    addIngrediente(datos.id_receta, datos)
        .then(data => {
            if (data.id) {
                msgComponenteInsertado.innerHTML = "Componente añadido con éxito";
                msgComponenteInsertado.style.color = "green";
                btnAñadirJoya.disabled = true;
                document.getElementById("cantidadComponente").value = "";
                _Init();

                selectComponentes.disabled = false;
                cantidadComponente.disabled = false;
                btnAñadirComponente.disabled = false;

            } else {
                msgComponenteInsertado.innerHTML = "No se ha podido añadir el componente";
                msgComponenteInsertado.style.color = "red";
            }
        })

        .catch(error => console.error('Error:', error));
    console.log(datos);
});

/**
 * @author Patricia Mota
 * @summary Botón de crear receta
 */

btnAñadirJoya.addEventListener('click', async function () {
    this.disabled = true;
    selectComponentes.disabled = false;
    cantidadComponente.disabled = false;
    btnAñadirComponente.disabled = false;
    let idTipoJoya = selectJoya.value;

    let data = await recetaNueva(idTipoJoya);
    msgJoyaInsertada.innerHTML = "Receta creada con éxito";
    msgJoyaInsertada.style.color = "green";

});

/**
 * @author Patricia Mota
 * @summary Botón de volver a ver recetas
 */

btnRecetas.addEventListener('click', function () {
    window.location.href = 'recetas.html';
    localStorage.removeItem('idRecetaNueva');
    localStorage.removeItem('recetaId');
});

/**
 * @author Patricia Mota
 * @summary Botón de crear nueva receta
 */

btnCrearNuevaReceta.addEventListener('click', function () {
    window.location.reload();
    localStorage.removeItem('idRecetaNueva');

});

function limpiarErrores() {
    msgErrorCantidad.textContent = "";
}

function validar() {
    limpiarErrores();
    var esValido = true;

    if (!validarCantidad(cantidadComponente, msgErrorCantidad)) {
        esValido = false;
    }

    return esValido;
}

_Init();