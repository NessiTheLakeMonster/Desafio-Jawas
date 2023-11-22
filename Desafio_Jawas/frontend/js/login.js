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

// Funciones
function _Init() {

}

async function loginUsuario(datos) {
    let body = JSON.stringify(
        {
            email: datos.email,
            password: datos.passwd
        }
    );

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body, /* JSON.stringify(usuario), */
        redirect: "follow"
    };

    const response = await fetch("http://127.0.0.1:8000/api/login", options);
    const data = await response.json();
    return data;
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
    esValido = true;

    if (!validarEmail(email, msgEmail)) {
        esValido = false;
    }
}

function limpiarErrores() {
    msgEmail.innerHTML = "";
    msgPasswd.innerHTML = "";
    msgInicioSesion.innerHTML = "";
}

// Eventos
btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    if (validar()) {
        loginUsuario(cargarDatos())
            .then(data => {
                if (data.status == "success") {
                    // TODO guardar el token en el local storage
                    /* localStorage.setItem("token", data.token); */
                    
                    msgInicioSesion.innerHTML = "Inicio de sesión correcto";
                    window.location.href = "home.html";
                } else {
                    msgInicioSesion.innerHTML = "Inicio de sesión incorrecto";

                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});