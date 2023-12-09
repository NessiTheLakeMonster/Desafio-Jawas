import { mostrarRolesUsuario } from "./http/http_preHome.js";

// Botones
const btnAdmin = document.getElementById("btnAdmin");
const btnColaborador = document.getElementById("btnColaborador");
const btnDisenador = document.getElementById("btnDisenador");
const btnClasificador = document.getElementById("btnClasificador");

let select = document.getElementById('roles');
let tablaRoles = document.getElementById('tablaRoles');

function _Init() {
    let $idUsuario = localStorage.getItem("usuarioId");
    ocultarBotones();

    mostrarRolesUsuario($idUsuario)
        .then(roles => {
            console.log($idUsuario);
            console.log(roles);

            roles.forEach(rol => {
                if (rol.nombre_rol == "administrador") {
                    btnAdmin.hidden = false;
                } else if (rol.nombre_rol == "colaborador") {
                    btnColaborador.hidden = false;
                } else if (rol.nombre_rol == "diseñador") {
                    btnDisenador.hidden = false;
                } else if (rol.nombre_rol == "clasificador") {
                    btnClasificador.hidden = false;
                }
            });

        })
        .catch(error => console.error('Error:', error));
}

export function ocultarBotones() {
    btnAdmin.hidden = true;
    btnColaborador.hidden = true;
    btnDisenador.hidden = true;
    btnClasificador.hidden = true;
}

// Botones
btnAdmin.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem("rol", "administrador");
    window.location.href = "home.html";
});

btnColaborador.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem("rol", "colaborador");
    window.location.href = "home.html";
});

btnDisenador.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem("rol", "diseñador");
    window.location.href = "home.html";
});

btnClasificador.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem("rol", "clasificador");
    window.location.href = "home.html";
});

_Init();