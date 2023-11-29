import { getRecetas, getReceta, getIngredientes, recetaNueva } from "./http/http_recetas.js";

//tablas
let tablaRecetas = document.getElementById("tablaRecetas");
let tablaIngredientes = document.getElementById("tablaIngredientes");

//botones
const btnCrearReceta = document.getElementById("btnCrearReceta");
const btnIngredientes = document.getElementById("btnIngredientes");

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

    tablaRecetas.appendChild(cabecera);
}

export function createTableRows(data) {
    return data.map(receta => `
        <tr>
            <td><input class="checkbox-lote" type="checkbox" name="lote" value="${receta.id}"></td>
            <td>${receta.id}</td>
            <td>${receta.idUsuario}</td>
            <td>${receta.created_at}</td>
            <td>${receta.updated_at}</td>
        </tr>
    `).join('');
}

export function _Init() {
    getRecetas().then(data => {
        console.log(data)
        
        cabeceraTabla(data);
        tablaRecetas.innerHTML += createTableRows(data);

        let checkboxes = document.querySelectorAll('.checkbox-lote');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    // Si el checkbox está seleccionado, guardar el ID en el localStorage
                    localStorage.setItem('recetaId', this.value);
                } else {
                    // Si el checkbox no está seleccionado, eliminar el ID del localStorage
                    localStorage.removeItem('recetaId');
                }
            });
        });
    }).catch(error => {
        console.error('Hubo un error al obtener las recetas:', error);
    });
}

_Init();