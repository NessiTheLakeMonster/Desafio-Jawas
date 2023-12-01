import { getRecetas, getReceta, getIngredientes, recetaNueva } from "./http/http_recetas.js";

//tablas
let tablaRecetas = document.getElementById("tablaRecetas");
let tablaIngredientes = document.getElementById("tablaIngredientes");

//botones
const btnCrearReceta = document.getElementById("btnCrearReceta");
const btnIngredientes = document.getElementById("btnIngredientes"); 
//barra de busqueda
let searchBar = document.getElementById("searchBar"); 
let searchButton = document.getElementById("searchButton");

export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');
    let headers = ['','ID', 'USUARIO'];

    headers.forEach(header => {
         let th = document.createElement('th');
         th.textContent = header;
         cabecera.appendChild(th);

    });

    tablaRecetas.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(receta => `
        <tr>
            <td><input class="checkbox-receta" type="checkbox" name="receta" value="${receta.id}"></td>
            <td>${receta.id}</td>
            <td>${receta.idUsuario}</td>

        </tr>
    `).join('');
}

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

export function createIngredientRows(data) {
    return data.map(ingrediente => `
        <tr>
            <td>${ingrediente.id_componente}</td>
            <td>${ingrediente.cantidad}</td>
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
            
                    localStorage.setItem('recetaId', this.value);
                } else {
         
                    localStorage.removeItem('recetaId');
                }
            });
        });
        document.getElementById('btnIngredientes').addEventListener('click', async () => {
            let id_receta = localStorage.getItem('recetaId');

            if (id_receta) {
                getIngredientes(id_receta).then(data => {
       
                    tablaIngredientes.innerHTML = '';
                    cabeceraTablaIngredientes();
                    tablaIngredientes.innerHTML += createIngredientRows(data);
                }).catch(error => {
                    console.error('Hubo un error al obtener los ingredientes:', error);
                });
            } else {
                msgErrorReceta.textContent = "Selecciona una receta de la lista";
            }
        });


    }).catch(error => {
        console.error('Hubo un error al obtener las recetas:', error);
    });
}

//Botón de buscar
searchButton.addEventListener('click', async function() {
    let id = searchBar.value;
    let data = await getReceta(id);

    tablaRecetas.innerHTML = "";

    if (data && data.id !== undefined) {

        data = Array.isArray(data) ? data : [data];

        cabeceraTabla(data);//
        tablaRecetas.innerHTML += createTableRows(data);

    } else {
        msgErrorReceta.textContent = "La receta que buscas no existe, selecciona una receta de la lista";
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

btnCrearReceta.addEventListener('click', function() {
    window.location.href = './recetasDetalle.html'
});

_Init();