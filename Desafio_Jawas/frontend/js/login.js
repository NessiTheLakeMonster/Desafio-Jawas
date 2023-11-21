import { Usuario } from "./utils/clases.js";
import { validarEmail } from "./utils/validaciones.js";

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

// Eventos
btnLogin.addEventListener("click", function () {
    if (validar()) {

        if (!buscarUsuario()) {
            msgInicioSesion.innerHTML = "No existe un usuario con ese email y contraseña";
            msgInicioSesion.style.color = "red";
        } else {
            window.location.href = "home.html";
        }
    }
});

// Funciones
function _Init() {

}

function buscarUsuario() { // FIXME mirar para que devuelva boolean
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    fetch("http://localhost:3000/usuarios", options) // TODO cambia URL de buscar usuarios
        .then(response => response.json())
        .then(data => console.log(data));
}

function validar() {
    limpiarErrores();
    esValido = true;

    if (!validarEmail(email, msgEmail)) {
        esValido = false;
    }
}

function limpiarErrores() {
    msgEmail.innerHTML = "";
    msgPasswd.innerHTML = "";
}