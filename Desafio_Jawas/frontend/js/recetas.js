//Importaciones
import { getRecetas, getReceta, getIngredientes, recetaNueva, modificarIngrediente } from "./http/http_recetas.js";

//Tablas
let tablaRecetas = document.getElementById("tablaRecetas");
let tablaIngredientes = document.getElementById("tablaIngredientes");

//Botón de crear receta
const btnCrearReceta = document.getElementById("btnCrearReceta");
//Botón de ver ingredientes
const btnIngredientes = document.getElementById("btnIngredientes");
//Botón de modificar receta
const btnModificarReceta = document.getElementById("btnModificarReceta");

//barra de busqueda
let buscador = document.getElementById("buscador");
let btnBuscar = document.getElementById("btnBuscar");
let msgErrorBuscar = document.getElementById("msgErrorBuscar");

//mensaje de error
let msgErrorReceta = document.getElementById("msgErrorReceta");


//TODO:PRUEBAS BORRAR
localStorage.setItem('usuarioId', '1');

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de recetas
 */

export function cabeceraTablaRecetas(data) {
    let cabecera = document.createElement('tr');
    let headers = ['', 'ID', 'USUARIO', 'TIPO JOYA'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);

    });
    tablaRecetas.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de recetas
 */

export function filaTablaRecetas(data) {
    return data.map(receta => `
        <tr>
            <td><input class="checkbox-receta" type="checkbox" name="receta" value="${receta.id}"></td>
            <td>${receta.id}</td>
            <td>${receta.nombre} ${receta.apellido}</td> 
            <td>${receta.tipo_joya}</td>

        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de ingredientes
 */

export function cabeceraTablaIngredientes() {
    let cabecera = document.createElement('tr');
    let titulo = document.createElement('tr');
    let headers = ['Componente', 'Cantidad'];

    let tituloIngredientes = document.createElement('th');
    tituloIngredientes.textContent = 'Ingredientes';
    tituloIngredientes.colSpan = headers.length;
    titulo.appendChild(tituloIngredientes);

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaIngredientes.appendChild(titulo);
    tablaIngredientes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de ingredientes
 */

export function filaTablaIngredientes(data) {
    return data.map(ingrediente => `
        <tr>
            <td>${ingrediente.nombre}</td>
            <td>${ingrediente.cantidad}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de modificar receta
 */

export function cabeceraModificarReceta() {
    let cabecera = document.createElement('tr');
    let titulo = document.createElement('tr');
    let headers = ['', 'Componente', 'Cantidad'];

    let tituloIngredientes = document.createElement('th');
    tituloIngredientes.textContent = 'Modificar Ingredientes';
    tituloIngredientes.colSpan = headers.length;
    titulo.appendChild(tituloIngredientes);

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);
    });

    tablaIngredientes.appendChild(titulo);
    tablaIngredientes.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de modificar receta
 */

export function filaTablaModificar(data) {
    return data.map(ingrediente => `
        <tr>
            <td><input class="checkbox-receta" type="checkbox" name="receta" value="${ingrediente.id_componente}" data-id="${ingrediente.id_componente}"></td>
            <td>${ingrediente.nombre}</td>
            <td>
                <button class="decrease-button" data-id="${ingrediente.id_componente}">-</button>
                ${ingrediente.cantidad}
                <button class="increase-button" data-id="${ingrediente.id_componente}">+</button>
            </td>
        </tr> 
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de mostrar las recetas en la tabla, de mostrar los ingredientes de la receta seleccionada y de modificar la cantidad de los ingredientes
 */

export function _Init() {

    getRecetas()
        .then(data => {

            if (data.status === 401) {
                window.location.href = "../html/noPermisos.html";
            }
            
            tablaRecetas.innerHTML = "";
            cabeceraTablaRecetas(data);
            tablaRecetas.innerHTML += filaTablaRecetas(data);

            let checkboxes = document.querySelectorAll('.checkbox-receta');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        checkboxes.forEach(otherCheckbox => {
                            if (otherCheckbox !== checkbox) {
                                otherCheckbox.checked = false;
                            }
                        });
                        localStorage.setItem('recetaId', this.value);
                    } else {
                        localStorage.removeItem('recetaId');
                    }
                });
            });

            //Botón de ver ingredientes
            document.getElementById('btnIngredientes').addEventListener('click', async () => {
                let id_receta = localStorage.getItem('recetaId');

                if (id_receta) {
                    getIngredientes(id_receta).then(data => {

                        tablaIngredientes.innerHTML = '';

                        cabeceraTablaIngredientes();
                        tablaIngredientes.innerHTML += filaTablaIngredientes(data);
                        msgErrorReceta.textContent = "";

                    }).catch(error => {
                        console.error('error al obtener los ingredientes:', error);
                    });
                } else {
                    tablaIngredientes.innerHTML = '';
                    msgErrorReceta.textContent = "Selecciona una receta de la lista";
                    msgErrorReceta.style.color = "red";
                }
            });

            //Botón de modificar receta
            document.getElementById('btnModificarReceta').addEventListener('click', async () => {
                let id_receta = localStorage.getItem('recetaId');

                if (id_receta) {
                    getIngredientes(id_receta).then(data => {

                        tablaIngredientes.innerHTML = '';

                        cabeceraModificarReceta();
                        tablaIngredientes.innerHTML += filaTablaModificar(data);
                        msgErrorReceta.textContent = "";

                        let checkboxes = document.querySelectorAll('.checkbox-receta');
                        let decreaseButtons = document.querySelectorAll('.decrease-button');
                        let increaseButtons = document.querySelectorAll('.increase-button');

                        let buttons = document.querySelectorAll('.decrease-button, .increase-button');

                        buttons.forEach(button => {
                            button.disabled = true;
                        });

                        checkboxes.forEach(checkbox => {
                            checkbox.addEventListener('change', function () {
                                if (this.checked) {
                                    checkboxes.forEach(otherCheckbox => {
                                        if (otherCheckbox !== checkbox) {
                                            otherCheckbox.checked = false;
                                        }
                                    });
                                    localStorage.setItem('id_componente', checkbox.value);

                                    buttons.forEach(button => {
                                        button.disabled = true;
                                    });

                                    // Activa solo los botones correspondientes al checkbox seleccionado
                                    let id = checkbox.getAttribute('data-id');
                                    let relatedButtons = document.querySelectorAll(`.decrease-button[data-id="${id}"], .increase-button[data-id="${id}"]`);

                                    relatedButtons.forEach(button => {
                                        button.disabled = false;
                                    });

                                } else {
                                    localStorage.removeItem('id_componente');
                                    buttons.forEach(button => {
                                        button.disabled = true;
                                    });
                                }
                            });
                        });


                        decreaseButtons.forEach(button => {
                            button.addEventListener('click', function () {
                                let id_componente = this.getAttribute('data-id');
                                if (id_componente) {
                                    let cantidad = parseInt(this.nextSibling.textContent);
                                    cantidad--;
                                    this.nextSibling.textContent = cantidad;
                                    let datos = {
                                        cantidad: cantidad,
                                        id_componente: id_componente
                                    };
                                    modificarIngrediente(datos).then(response => {
                                        console.log(response);
                                    });
                                }
                            });
                        });

                        increaseButtons.forEach(button => {
                            button.addEventListener('click', function () {
                                let id_componente = this.getAttribute('data-id');
                                if (id_componente) {
                                    let cantidad = parseInt(this.previousSibling.textContent);
                                    cantidad++;
                                    this.previousSibling.textContent = cantidad;
                                    let datos = {
                                        cantidad: cantidad,
                                        id_componente: id_componente
                                    };
                                    modificarIngrediente(datos).then(response => {
                                        console.log(response);
                                    });
                                }
                            });
                        });

                    }).catch(error => {
                        console.error('error al obtener los ingredientes:', error);
                    });

                } else {
                    tablaIngredientes.innerHTML = '';
                    msgErrorReceta.textContent = "Selecciona una receta de la lista";
                    msgErrorReceta.style.color = "red";
                }
            });


        }).catch(error => {
            console.error('error al obtener las recetas:', error);
        });
}

/**
 * @author Patricia Mota
 * @summary Botón de buscar receta
 */

btnBuscar.addEventListener('click', async function () {
    let id = buscador.value;

    if (id === "") {
        let data = await getRecetas();
        tablaRecetas.innerHTML = "";
        cabeceraTablaRecetas(data);
        tablaRecetas.innerHTML += filaTablaRecetas(data);
    } else {
        let data = await getReceta(id);
        tablaRecetas.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTablaRecetas(data);
            tablaRecetas.innerHTML += filaTablaRecetas(data);
        } else {
            msgErrorSearch.textContent = "La receta que buscas no existe, selecciona una receta de la lista";
            msgErrorSearch.style.color = "red";
            _Init();
        }
    }
});

/**
 * @author Patricia Mota
 * @summary Botón de enter en el buscador
 */

buscador.addEventListener('keyup', async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnBuscar.click();
    }
});

/**
 * @author Patricia Mota
 * @summary Botón de crear receta
 */

btnCrearReceta.addEventListener('click', async function () {
    localStorage.removeItem('recetaId');
    window.location.href = './recetasDetalle.html'
});

_Init();