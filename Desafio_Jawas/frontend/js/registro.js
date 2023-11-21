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

async function guardarUsuario() {
    let usuario = new Usuario(
        fotoPerfil.value,
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

    try {
        const response = await fetch("http://localhost:800/api/registro", options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
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