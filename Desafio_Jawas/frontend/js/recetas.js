import { getRecetas, getReceta, getIngredientes, recetaNueva, modificarIngrediente } from "./http/http_recetas.js";

//tablas
let tablaRecetas = document.getElementById("tablaRecetas");
let tablaIngredientes = document.getElementById("tablaIngredientes");

//botones
const btnCrearReceta = document.getElementById("btnCrearReceta");
const btnIngredientes = document.getElementById("btnIngredientes"); 
const btnModificarReceta = document.getElementById("btnModificarReceta");

//barra de busqueda
let searchBar = document.getElementById("searchBar"); 
let searchButton = document.getElementById("searchButton");

//mensaje de error
let msgErrorReceta = document.getElementById("msgErrorReceta");
let msgErrorSearch = document.getElementById("msgErrorSearch");

//TODO:PRUEBAS BORRAR
localStorage.setItem('usuarioId', '1'); 

//cabecera tabla recetas
export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');
    let headers = ['','ID', 'USUARIO', 'TIPO JOYA'];

    headers.forEach(header => {
         let th = document.createElement('th');
         th.textContent = header;
         cabecera.appendChild(th);

    });

    tablaRecetas.appendChild(cabecera);
}

//tabla recetas
export function createTableRows(data) {
    return data.map(receta => `
        <tr>
            <td><input class="checkbox-receta" type="checkbox" name="receta" value="${receta.id}"></td>
            <td>${receta.id}</td>
            <td>${receta.nombre} ${receta.apellido}</td> 
            <td>${receta.tipo_joya}</td>

        </tr>
    `).join('');
}

//cabecera tabla ingredientes
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

//tabla ingredientes
export function createIngredientRows(data) {
    return data.map(ingrediente => `
        <tr>
            <td>${ingrediente.nombre}</td>
            <td>${ingrediente.cantidad}</td>
        </tr>
    `).join('');
}

//cabecera modificar receta
export function cabeceraModificarReceta() {
    let cabecera = document.createElement('tr');
    let titulo = document.createElement('tr');
    let headers = ['','Componente', 'Cantidad'];

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

//tabla modificar receta
export function createModificarRecetaRows(data) {
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

export function _Init() {

    getRecetas().then(data => {
        
        cabeceraTabla(data);
        tablaRecetas.innerHTML += createTableRows(data);

        let checkboxes = document.querySelectorAll('.checkbox-receta');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    localStorage.setItem('recetaId', checkbox.value);
                
                } else {
                    localStorage.removeItem('recetaId');
                    location.reload();
                }
            });
        });
       
        //Botón de ingredientes
        document.getElementById('btnIngredientes').addEventListener('click', async() => {
            let id_receta = localStorage.getItem('recetaId');

            if (id_receta) {
                getIngredientes(id_receta).then(data => {
    
                    tablaIngredientes.innerHTML = '';

                    cabeceraTablaIngredientes();
                    tablaIngredientes.innerHTML += createIngredientRows(data);
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
        document.getElementById('btnModificarReceta').addEventListener('click', async() => {
            let id_receta = localStorage.getItem('recetaId');

            if (id_receta) {
                getIngredientes(id_receta).then(data => {

                    tablaIngredientes.innerHTML = '';

                    cabeceraModificarReceta();
                    tablaIngredientes.innerHTML += createModificarRecetaRows(data);
                    msgErrorReceta.textContent = "";

                    let checkboxes = document.querySelectorAll('.checkbox-receta');
                    let decreaseButtons = document.querySelectorAll('.decrease-button');
                    let increaseButtons = document.querySelectorAll('.increase-button');
        
        
                    let buttons = document.querySelectorAll('.decrease-button, .increase-button');
                        buttons.forEach(button => {
                            button.disabled = true;
                    });

                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', function() {
                            if (this.checked) {
                                checkboxes.forEach(otherCheckbox => {
                                    if (otherCheckbox !== checkbox) {
                                        otherCheckbox.checked = false;
                                    }
                                });
                                localStorage.setItem('id_componente', checkbox.value);
                    
                                // Desactivar todos los botones
                                buttons.forEach(button => {
                                    button.disabled = true;
                                });
                    
                                // Activar solo los botones correspondientes al checkbox seleccionado
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
                        button.addEventListener('click', function() {
                            let id_componente = this.getAttribute('data-id');
                            if (id_componente){
                                let cantidad = parseInt(this.nextSibling.textContent);
                                cantidad--;
                                this.nextSibling.textContent = cantidad;
                                let datos = { cantidad: cantidad,
                                            id_componente: id_componente };
                                modificarIngrediente(datos).then(response => {
                                    console.log(response);
                                });
                            }
                        });
                    });

                    increaseButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            let id_componente = this.getAttribute('data-id');
                            if (id_componente) {
                                let cantidad = parseInt(this.previousSibling.textContent);
                                cantidad++;
                                this.previousSibling.textContent = cantidad;
                                let datos = { cantidad: cantidad,
                                            id_componente: id_componente  };
                                modificarIngrediente(datos).then(response => {
                                    console.log(response); // Imprime la respuesta de la API
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

//Botón de buscar
searchButton.addEventListener('click', async function() {
    let id = searchBar.value;

    if (id === "") {
        let data = await getRecetas();
        tablaRecetas.innerHTML = "";
        cabeceraTabla(data);
        tablaRecetas.innerHTML += createTableRows(data);
    } else {
        let data = await getReceta(id);
        tablaRecetas.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTabla(data);
            tablaRecetas.innerHTML += createTableRows(data);
        } else {
            msgErrorSearch.textContent = "La receta que buscas no existe, selecciona una receta de la lista";
            msgErrorSearch.style.color = "red";
            _Init();
        }
    }
});

//TECLA ENTER
searchBar.addEventListener('keyup', async function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});

//Botón crear receta
btnCrearReceta.addEventListener('click', async function() {
    //let data = await recetaNueva();
    window.location.href = './recetasDetalle.html'
});

_Init();