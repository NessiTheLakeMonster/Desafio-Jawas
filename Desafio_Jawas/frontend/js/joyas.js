import { getJoyas, modificarImg, getJoya } from "./http/http_joyas.js";

//barra de busqueda
let searchBar = document.getElementById("searchBar"); 
let searchButton = document.getElementById("searchButton");

//tabla de joyas
const tablaJoyas = document.getElementById("tablaJoyas")
const tablaModificarJoya = document.getElementById("tablaModificarJoya")

//mensaje de error
let msgErrorJoya = document.getElementById("msgErrorJoya");
let msgErrorBuscar = document.getElementById("msgErrorBuscar");

//foto
let inputImagenUrl = document.getElementById('inputImagenUrl');

//botones
const btnModificarJoya = document.getElementById("btnModificarJoya");
const btnGenerarJoya = document.getElementById("btnGenerarJoya");

//cabecera tabla joyas
export function cabeceraTabla(data) {
    let cabecera = document.createElement('tr');
    let headers = ['','IMÁGEN','TIPO JOYA'];

    headers.forEach(header => {
         let th = document.createElement('th');
         th.textContent = header;
         cabecera.appendChild(th);

    });

    tablaJoyas.appendChild(cabecera);
}

//tabla recetas
export function crearFilasJoyas(data) {
    return data.map(joya => `
        <tr>
            <td><input class="checkbox-joya" type="checkbox" name="joya" value="${joya.id}"></td>
            <td><img src= "${joya.foto}" width = "20px"></td>
            <td>${joya.tipo_joya}</td>
        </tr>
    `).join('');
}

//cabecera tabla modificar joya
export function cabeceraTablaModificarJoya(data) {
    let cabecera = document.createElement('tr');
    let headers = ['','IMÁGEN','TIPO JOYA'];

    headers.forEach(header => {
         let th = document.createElement('th');
         th.textContent = header;
         cabecera.appendChild(th);

    });

    tablaJoyas.appendChild(cabecera);
}

//tabla modificar joya
export function crearFilasModificarJoya(data) {
    return data.map(joya => `
        <tr>
            <td><input class="checkbox-joya" type="checkbox" name="joya" value="${joya.id}"></td>
            <td><img src= "${joya.foto}" width = "20px"></td>
            <td>${joya.tipo_joya}</td>
            <td><input type="file" id="inputImagen-${joya.id}" name="inputImagen" accept="image/*"></td>
        </tr>
    `).join('');
}

export function _Init(){
    getJoyas().then (data => {
        cabeceraTabla(data);
        tablaJoyas.innerHTML += crearFilasJoyas(data);

        let checkboxes = document.querySelectorAll('.checkbox-joya');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    localStorage.setItem('joyaId', checkbox.value);
                
                } else {
                    localStorage.removeItem('joyaId');
                    location.reload();
                }
            });
        });
    }).catch(error => {
        console.error('error al obtener las joyas:', error);
    });
    
}
//TODO: COMO MODIFICAR FOTO
// botón modificar foto
btnModificarJoya.addEventListener('click', async function (){

    let idJoya = localStorage.getItem('joyaId');

    if (idJoya) {
        let inputImagen = document.getElementById(`inputImagen-${idJoya}`);

        if (inputImagen && inputImagen.files.length > 0) {
            let nuevaImagen = inputImagen.files[0];

            let datos = {
                foto: nuevaImagen
            }

            modificarImg(datos)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });

            getJoyas().then (data => {
                tablaModificarJoya.innerHTML = "";

                cabeceraTablaModificarJoya(data);
                tablaModificarJoya.innerHTML += crearFilasModificarJoya(data);
                msgErrorJoya.textContent = "";

            }).catch(error => {
                console.error('error al obtener las joyas:', error);
            });
        } else {
            console.error('No se seleccionó ninguna imagen');
        }
    }else{
        tablaModificarJoya.innerHTML = "";
        msgErrorJoya.textContent = "Selecciona una joya de la lista";
        msgErrorJoya.style.color = "red";
    }
});

//Botón de buscar
searchButton.addEventListener('click', async function() {
    let id = searchBar.value;

    if (id === "") {
        let data = await getJoyas();
        tablaJoyas.innerHTML = "";
        cabeceraTabla(data);
        tablaJoyas.innerHTML += crearFilasJoyas(data);
    } else {
        let data = await getJoya(id);
        tablaJoyas.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTabla(data);
            tablaJoyas.innerHTML += crearFilasJoyas(data);
        } else {
            msgErrorBuscar.textContent = "La joya que buscas no existe, selecciona una joya de la lista";
            msgErrorBuscar.style.color = "red";
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

//Botón crear joya
btnGenerarJoya.addEventListener('click', async function() {
    //let data = await recetaNueva();
    window.location.href = './joyasDetalle.html'
});

_Init();