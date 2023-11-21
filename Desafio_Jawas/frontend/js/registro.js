import { Usuario } from "./utils/clases.js";
import { validarNombre, validarApellido, validarEmail, validarPasswd } from "./utils/validaciones.js";

// Campos del formulario de registro
let fotoPerfil = document.getElementById("fotoPerfilRegistro");
let nombre = document.getElementById("nombreRegistro");
let apellido = document.getElementById("apellidoRegistro");
let email = document.getElementById("mailRegistro");
let passwd = document.getElementById("passwdRegistro");
let confPasswd = document.getElementById("confPasswdRegistro");

// Mensajes de error
let msgNom = document.getElementById("msgErrorNombre");
let msgApe = document.getElementById("msgErrorApellido");
let msgEmail = document.getElementById("msgErrorEmail");
let msgPasswd = document.getElementById("msgErrorPasswd");
let msgConfPasswd = document.getElementById("msgErrorConfPasswd");

// Mensaje de creación de cuenta
let msgCuentaCreada = document.getElementById("msgExito");

// Botón de registro
const btnRegistro = document.getElementById("btnRegistro");

let usuario = [];

// Eventos
/* btnRegistro.addEventListener("click", function () {
    if (validar()) {
        msgCuentaCreada.innerHTML = "Cuenta creada con éxito";
        msgCuentaCreada.style.color = "green";

        guardarUsuario();
        btnRegistro.disabled = true;
    }
}); */

// Funciones
function _Init() {

}

async function guardarUsuario(datos) {
    let body = JSON.stringify(
        {
            fotoPerfil: datos.fotoPerfil,
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            password: datos.passwd,
            password_confirmation: datos.confPasswd
        }
    );

    /* usuario = new Usuario(
        fotoPerfil.value,
        nombre.value,
        apellido.value,
        email.value,
        passwd.value,
        confPasswd.value
    ); */

    /* sessionStorage.setItem("usuario", JSON.stringify(usuario)); */

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body, /* JSON.stringify(usuario), */
        redirect: "follow"
    };

    const response = await fetch("http://127.0.0.1:8000/api/registro", options);
    const data = await response.json();
    return data;
}


function asignarRol() { // TODO cuando se cree el usuario debe ser colaborador

}

function cogerDatos() {
    let datos = {
        fotoPerfil: fotoPerfil.value,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        passwd: passwd.value,
        confPasswd: confPasswd.value
    };

    return datos;
}

function validar() {
    limpiarErrores();
    var esValido = true;

    if (!validarNombre(nombre, msgNom)) {
        esValido = false;
    }

    if (!validarApellido(apellido, msgApe)) {
        esValido = false;
    }

    if (!validarEmail(email, msgEmail)) {
        esValido = false;
    }

    if (!validarPasswd(passwd, confPasswd, msgPasswd, msgConfPasswd)) {
        esValido = false;
    }

    return esValido;
}

function limpiarErrores() {
    msgNom.textContent = "";
    msgApe.textContent = "";
    msgEmail.textContent = "";
    msgPasswd.textContent = "";
    msgConfPasswd.textContent = "";
}

btnRegistro.addEventListener("click", function (e) {
    /* e.preventDefault(); */

    guardarUsuario(cogerDatos())
    .then(data => {
        console.log(data);
        if (data.status == 200) {
            msgCuentaCreada.innerHTML = "Cuenta creada con éxito";
            msgCuentaCreada.style.color = "green";
            btnRegistro.disabled = true;
        } else {
            msgCuentaCreada.innerHTML = "Error al crear la cuenta";
            msgCuentaCreada.style.color = "red";
        }
    })
    .catch (error => console.log(error));
});
