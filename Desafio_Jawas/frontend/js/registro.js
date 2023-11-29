import { Usuario } from "./utils/clases.js";
import { validarNombre, validarApellido, validarEmail, validarPasswd } from "./utils/validaciones.js";
import { guardarUsuario } from "./http/http_registro.js";

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

// Funciones
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
    msgCuentaCreada.textContent = "";
}

// Eventos
btnRegistro.addEventListener("click", function (e) {
    e.preventDefault();

    if (validar()) {
        guardarUsuario(cogerDatos())
            .then(data => {
                if (data.status == 200) {
                    msgCuentaCreada.innerHTML = "Cuenta creada con éxito";
                    msgCuentaCreada.style.color = "green";
                    window.location.href = "login.html";
                } else {
                    msgCuentaCreada.innerHTML = "Error al crear la cuenta";
                    msgCuentaCreada.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

});
