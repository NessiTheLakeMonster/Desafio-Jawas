import { Usuario } from "./utils/clases.js";
import { validarEmail } from "./utils/validaciones.js";
import { loginUsuario } from "./http/http_login.js";

// Campos del formularion de inicio de sesión
let email = document.getElementById("mailLogin");
let passwd = document.getElementById("passwdLogin");

// Mensajes de error
let msgEmail = document.getElementById("msgErrorEmail");
let msgPasswd = document.getElementById("msgErrorPasswd");

// Mensaje de inicio de sesión
let msgInicioSesion = document.getElementById("msgExito");

// Botón de inicio de sesión
const btnLogin = document.getElementById("btnLogin");

// Funciones
function _Init() {

}

function cargarDatos() {
    let datos = {
        email: email.value,
        passwd: passwd.value
    }

    return datos;
}

function validar() {
    limpiarErrores();

    var esValido = true;

    if (!validarEmail(email, msgEmail)) {
        esValido = false;
    }

    return esValido;
}

function limpiarErrores() {
    msgEmail.innerHTML = "";
    msgPasswd.innerHTML = "";
    msgInicioSesion.innerHTML = "";
}

// Eventos
btnLogin.addEventListener("click", function (e) {
    /* e.preventDefault(); */

    if (validar()) {
        loginUsuario(cargarDatos())
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    // TODO guardar el token en el local storage
                    /* localStorage.setItem("token", data.usuario.token); */
                    localStorage.setItem("usuarioId", data.usuario.id);
                    console.log(data.usuario.id);
                    
                    sessionStorage.setItem("token", data.token);
                    msgInicioSesion.innerHTML = "Inicio de sesión correcto";
                    window.location.href = "preHome.html";
                } else {
                    msgInicioSesion.innerHTML = "Inicio de sesión incorrecto";

                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});