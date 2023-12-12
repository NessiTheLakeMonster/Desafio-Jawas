import { getJoyas, modificarImg, getJoya } from "./http/http_joyas.js";

//barra de busqueda
let buscador = document.getElementById("buscador");
let btnBuscar = document.getElementById("btnBuscar");
let msgErrorBuscar = document.getElementById("msgErrorBuscar");

//tabla de joyas
const tablaJoyas = document.getElementById("tablaJoyas")
const tablaModificarJoya = document.getElementById("tablaModificarJoya")

//mensaje de error
let msgErrorJoya = document.getElementById("msgErrorJoya");

//botones
const btnModificarJoya = document.getElementById("btnModificarJoya");
const btnGenerarJoya = document.getElementById("btnGenerarJoya");


/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de joyas
 */

export function cabeceraTablaJoyas(data) {
    let cabecera = document.createElement('tr');
    let headers = ['', 'ID','IMÁGEN', 'TIPO JOYA'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);

    });
    tablaJoyas.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de joyas
 */

export function filaTablaJoyas(data) {
    return data.map(joya => `
        <tr>
            <td><input class="checkbox-joya" type="checkbox" name="joya" value="${joya.id}"></td>
            <td>${joya.id}</td>
            <td><img src= "${joya.foto}" width = "20px"></td>
            <td>${joya.tipo_joya}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de modificar joyas
 */

export function cabeceraTablaModificarJoya(data) {
    let cabecera = document.createElement('tr');
    let headers = ['IMAGEN', 'TIPO JOYA'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);

    });
    tablaJoyas.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear las filas de la tabla de modificar joyas
 */

export function crearFilasModificarJoya(data) {
    return data.map(joya => `
        <tr>
            <td><img src= "${joya.foto}" width = "20px"></td>
            <td>${joya.tipo_joya}</td>
            <td><input type="file" id="inputImagen-${joya.id}" name="inputImagen" accept="image/*"></td>
            <td><button onclick="guardarCambios(${joya.id})" class="btn btn-primary">Guardar cambios</button></td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de inicializar la página de joyas
 */

export function _Init() {
    getJoyas().then(data => {

        if (data.status === 401) {
            window.location.href = "../html/noPermisos.html";
        }

        tablaJoyas.innerHTML = "";
        cabeceraTablaJoyas(data);
        tablaJoyas.innerHTML += filaTablaJoyas(data);

        let checkboxes = document.querySelectorAll('.checkbox-joya');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {

                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                    localStorage.setItem('joyaId', checkbox.value);
                } else {
                    localStorage.removeItem('joyaId');
                }
            });
        });

        // botón modificar foto
        btnModificarJoya.addEventListener('click', async function () {

            let id = localStorage.getItem('joyaId');

            if (id) {
                getJoya(id).then(joya => {
                    btnModificarJoya.disabled = true;

                    let data = Array.isArray(joya) ? joya : [joya];

                    cabeceraTablaModificarJoya(data);
                    tablaModificarJoya.innerHTML = "";

                    tablaModificarJoya.innerHTML += crearFilasModificarJoya(data);
                    msgErrorJoya.textContent = "";
                    _Init();

                }).catch(error => {
                    console.log('Error al cargar la tabla de joyas', error);
                });
            } else {
                tablaModificarJoya.innerHTML = "";
                msgErrorJoya.textContent = "Selecciona una joya de la lista";
                msgErrorJoya.style.color = "red";
            }

            //botón guardar cambios
            window.guardarCambios = function (id) {
                let inputImagen = document.getElementById(`inputImagen-${id}`);

                if (inputImagen && inputImagen.files.length > 0) {
                    let nuevaImagen = inputImagen.files[0];

                    let formData = new FormData();
                    formData.append('image', nuevaImagen);

                    modificarImg(formData)
                        .then(response => {
                            console.log(response);
                            msgErrorJoya.textContent = "La imagen se ha modificado correctamente";
                            msgErrorJoya.style.color = "green";
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                        
                }

            }
        });

    })
};

/**
 * @author Patricia Mota
 * @summary Manejador de eventos que se ejecuta cuando se hace clic en el botón de búsqueda
 */

//Botón de buscar
btnBuscar.addEventListener('click', async function () {
    let id = buscador.value;

    if (id === "") {
        let data = await getJoyas();
        tablaJoyas.innerHTML = "";
        cabeceraTablaJoyas(data);
        tablaJoyas.innerHTML += filaTablaJoyas(data);
    } else {
        let data = await getJoya(id);
        tablaJoyas.innerHTML = "";

        if (data && data.id !== undefined) {
            data = Array.isArray(data) ? data : [data];
            cabeceraTablaJoyas(data);
            tablaJoyas.innerHTML += filaTablaJoyas(data);
        } else {
            msgErrorBuscar.textContent = "La joya que buscas no existe, selecciona una joya de la lista";
            msgErrorBuscar.style.color = "red";
            _Init();
        }
    }
});

/**
 * @author Patricia Mota
 * @summary Manejador de eventos que se ejecuta cuando se presiona la tecla Enter en el campo de búsqueda
 */

buscador.addEventListener('keyup', async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnBuscar.click();
    }
});

/**
 * @author Patricia Mota
 * @summary Manejador de eventos que se ejecuta cuando se hace clic en el botón de generar joya y redirige a la página de detalle de joya
 */

btnGenerarJoya.addEventListener('click', async function () {
    window.location.href = './joyasDetalle.html'
});

_Init();