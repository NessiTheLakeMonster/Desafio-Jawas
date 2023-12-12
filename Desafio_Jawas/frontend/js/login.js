import { Usuario } from "./utils/clases.js";
import { validarEmail } from "./utils/validaciones.js";
import { loginUsuario } from "./http/http_login.js";

// Campos del formularion de inicio de sesión
let email = document.getElementById("mailLogin");
let passwd = document.getElementById("passwdLogin");

let imgMostrarPasswd = document.getElementById("imgMostrarPasswd");

// Mensajes de error
let msgEmail = document.getElementById("msgErrorEmail");
let msgPasswd = document.getElementById("msgErrorPasswd");

// Mensaje de inicio de sesión
let msgInicioSesion = document.getElementById("msgExito");

// Botón de inicio de sesión
const btnLogin = document.getElementById("btnLogin");
const mostrarPasswd = document.getElementById("mostrarPasswd");

// Funciones
function _Init() {
    msgEmail.classList.add('d-none');
    msgPasswd.classList.add('d-none');
    msgInicioSesion.classList.add('d-none');
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
        msgEmail.classList.remove('d-none');
    } else if (passwd.value == "") {
        esValido = false;
        msgPasswd.classList.remove('d-none');
        msgPasswd.innerHTML = "La contraseña no puede estar vacía";
    }

    return esValido;
}

function limpiarErrores() {
    msgEmail.innerHTML = "";
    msgEmail.classList.add('d-none');
    msgPasswd.innerHTML = "";
    msgEmail.classList.add('d-none');
    msgInicioSesion.innerHTML = "";
    msgInicioSesion.classList.add('d-none');
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

                    sessionStorage.setItem("token", data.token);
                    msgInicioSesion.classList.remove('d-none');
                    msgInicioSesion.innerHTML = "Inicio de sesión correcto";
                    window.location.href = "preHome.html";
                } else {
                    msgInicioSesion.classList.remove('d-none');
                    msgInicioSesion.innerHTML = "Inicio de sesión incorrecto";

                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});

mostrarPasswd.addEventListener("click", function () {
    if (passwdLogin.type === "password") {
        imgMostrarPasswd.src = "../assets/ojo_abierto.png"
        passwdLogin.type = "text";
        togglePassword.textContent = "Ocultar";
    } else if (passwdLogin.type === "text") {
        imgMostrarPasswd.src = "../assets/ojo_cerrado.png"
        passwdLogin.type = "password";
        togglePassword.textContent = "Mostrar";
    }
});

// Inicialización
_Init();