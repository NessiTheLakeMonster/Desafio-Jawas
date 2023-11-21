import { Usuario } from "./utils/clases.js";
import { validarNombre, validarApellido, validarEmail, validarPasswd } from "./utils/validaciones.js";

// Campos del formulario de registro
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

// Eventos
btnRegistro.addEventListener("click", function () {
    if (validar()) {
        msgCuentaCreada.innerHTML = "Cuenta creada con éxito";
        msgCuentaCreada.style.color = "green";

        guardarUsuario();
        btnRegistro.disabled = true;
    }
});

// Funciones
function _Init() {

}

function guardarUsuario() {
    let usuario = new Usuario(
        nombre.value,
        apellido.value,
        email.value,
        passwd.value
    );

    sessionStorage.setItem("usuario", JSON.stringify(usuario));

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    };

    fetch("http://localhost:3000/usuarios", options) // TODO cambia URL de guardar usuarios
        .then(response => response.json())
        .then(data => console.log(data));
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