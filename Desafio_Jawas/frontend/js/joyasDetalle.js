import { generarJoya, verificarComponentes, getInventario, getTipos, getRecetas, subirImagen } from "./http/http_joyas.js";

//select elegir tipo joya
let selectJoya = document.getElementById("selectJoya");
//select elegir receta
let selectReceta = document.getElementById("selectReceta");

//botón generar joya
let btnGenerarJoya = document.getElementById("btnGenerarJoya");
//botón volver a joyas
let btnVolverJoyas = document.getElementById("btnVolverJoyas");
//botón volver a intentarlo
let btnVolverIntento = document.getElementById("btnVolverIntento");

//tabla de inventario
let tablaInventario = document.getElementById("tablaInventario");

//formulario de imagen
let formImagen = document.getElementById("formImagen");
let inputImagen = formImagen.elements.namedItem("image");

let respuesta = document.getElementById('respuesta');

//msg de suficientes componentes
let msgsuficientesComponentes = document.getElementById("msgsuficientesComponentes");


/**
 * @author Patricia Mota
 * @summary Función que se encarga de crear la cabecera de la tabla de componentes
 */

export function cabeceraTablaComponentes(data) {
    let cabecera = document.createElement('tr');
    let headers = ['COMPONENTE', 'CANTIDAD'];

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        cabecera.appendChild(th);

    });

    tablaInventario.appendChild(cabecera);
}

/**
 * @author Patricia Mota
 * @summary Función que se encarga de inicializar la página de creacion de joyas
 */

export function crearFilasComponentes(data) {
    return data.map(componente => `
        <tr>

            <td>${componente.nombre_componente}</td>
            <td>${componente.cantidad}</td>
        </tr>
    `).join('');
}

/**
 * @author Patricia Mota
 * @summary Recupera los tipos de joyas y las recetas de la joya seleccionada
 */

//Select de Tipos de Joyas
getTipos()
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
        });
    })
    .catch(error => console.error('Error:', error));

let recetaSeleccionada;

selectJoya.addEventListener('change', function () {
    let joyaSeleccionada = this.value; //ID de la joya seleccionada

    selectJoya.disabled = true;

    getRecetas(joyaSeleccionada)
        .then(recetas => {
            selectReceta.innerHTML = '';

            let opcionPorDefecto = document.createElement('option');
            opcionPorDefecto.value = '';
            opcionPorDefecto.text = 'Selecciona una receta';
            selectReceta.appendChild(opcionPorDefecto);

            recetas.forEach(receta => {
                let elementoOpcion = document.createElement('option');
                elementoOpcion.value = receta.id;
                elementoOpcion.text = receta.id;
                selectReceta.appendChild(elementoOpcion);
            });
        })
        .catch(error => console.error('Error:', error));


    selectReceta.addEventListener('change', function () {
        recetaSeleccionada = this.value;
        localStorage.setItem('recetaSeleccionada', recetaSeleccionada);
        selectReceta.disabled = true;
        btnGenerarJoya.disabled = false;
    });
});

/**
 * @author Patricia Mota
 * @summary Función que se encarga de inicializar la página de creacion de joyas
 */

export function _Init() {

    getInventario()
        .then(data => {

            if (data.status === 401) {
                window.location.href = "../html/noPermisos.html";
            }

            tablaInventario.innerHTML = "";
            cabeceraTablaComponentes(data);
            tablaInventario.innerHTML += crearFilasComponentes(data);

        })
        .catch(error => console.error('Error:', error));

}

/**
 * @author Patricia Mota
 * @summary Botones de la página de creacion de joyas
 */


//botón ver todas las joyas
btnVolverJoyas.addEventListener('click', function () {
    window.location.href = "joyas.html";
    localStorage.removeItem('recetaSeleccionada');
});

//Botón elegir otra joya
btnVolverIntento.addEventListener('click', function () {
    window.location.href = "joyasDetalle.html";
    localStorage.removeItem('recetaSeleccionada');
});

btnGenerarJoya.disabled = true;

inputImagen.addEventListener('change', function () {
    if (inputImagen.files.length !== 0) {
        btnGenerarJoya.disabled = false;
    }
});

formImagen.addEventListener('submit', function (e) {
    e.preventDefault();
});


//Botón generar joya
btnGenerarJoya.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputImagen.files.length === 0) {
        respuesta.textContent = 'Por favor, inserta una imagen.';
        respuesta.style.color = 'red';
    } else {
        let fotoJoya = inputImagen.files[0];

        let formData = new FormData();
        formData.append('image', fotoJoya)

        console.log(formData.get("image"))
        subirImagen(formData)
            .then(urlImagen => {
                let url = urlImagen.url;

                let datos = JSON.stringify({
                    idTipoJoya: parseInt(selectJoya.value),
                    idReceta: parseInt(selectReceta.value),
                    foto: url
                });

                recetaSeleccionada = localStorage.getItem('recetaSeleccionada');

                if (recetaSeleccionada) {
                    verificarComponentes(recetaSeleccionada)
                        .then(data => {
                            console.log(data);
                            let respuesta = document.getElementById('respuesta');
                            let formattedData = '';
                            if (data.error) {
                                formattedData = `${data.error}<br>Componente: ${data.componente}<br>Cantidad Necesaria: ${data['cantidad Necesaria']}<br>Cantidad Inventario: ${data['cantidad Inventario']}<br>Cantidad Faltante: ${data['cantidad Faltante']}`;
                                respuesta.style.color = 'red';
                                msgsuficientesComponentes.innerHTML = 'No hay suficientes componentes para generar la joya';
                                msgsuficientesComponentes.style.color = 'red';
                            } else {
                                formattedData = `${data.message}<br>Cantidad de Joyas que puedes realizar: ${data['Cantidad de Joyas que puedes realizar']}`;
                                respuesta.style.color = 'yellow';
                                generarJoya(datos)

                                    .then(data => {
                                        console.log(data);
                                        msgsuficientesComponentes.innerHTML = 'Joya generada con éxito';
                                        msgsuficientesComponentes.style.color = 'green';
                                        localStorage.removeItem('recetaSeleccionada');
                                        btnGenerarJoya.disabled = true;

                                        _Init();
                                    })
                            }
                            respuesta.innerHTML = formattedData;
                        })
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));
    }
});

_Init();
