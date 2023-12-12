import { getUsuario, modificarDatosPerfil, modificarFotoPerfil, modificarPasswd, cerrarSesion } from "./http/http_perfil.js";
import { validarNombre, validarApellido, validarPasswdPerfil } from "./utils/validaciones.js";

// Datos del html
let imgFotoPerfil = document.getElementById("imgFotoPerfil");
let fotoPerfil = document.getElementById("newFotoPerfil");
let nombrePerfil = document.getElementById("nombrePerfil");
let apellidosPerfil = document.getElementById("apellidosPerfil");
let emailPerfil = document.getElementById("emailPerfil");
let passwdPerfil = document.getElementById("passwdPerfil");

let imgMostrarPasswd = document.getElementById("imgMostrarPasswd");

// Botones
const btnActualizarDatos = document.getElementById("btnActualizarDatos");
const btnNewPasswd = document.getElementById("btnNewPasswd");
const btnSubirImagen = document.getElementById("btnSubirImagen");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const mostrarPasswd = document.getElementById("mostrarPasswd");

// Mensajes de error y exito
let msgExito = document.getElementById("msgExito");
let msgErrorNombre = document.getElementById("msgErrorNombre");
let msgErrorApellido = document.getElementById("msgErrorApellidos");
let msgErrorPasswd = document.getElementById("msgErrorPasswd");
let msgExitoFoto = document.getElementById("msgExitoFoto");

export function _Init() {
    msgExito.classList.add('d-none');
    msgErrorNombre.classList.add('d-none');
    msgErrorApellido.classList.add('d-none');
    msgErrorPasswd.classList.add('d-none');

    // Cargamos los datos del usuario
    let idUsuario = localStorage.getItem("usuarioId");
    console.log(idUsuario);

    getUsuario(idUsuario)
        .then(data => {
            console.log(data);
            imgFotoPerfil.src = data.fotoPerfil;
            nombrePerfil.value = data.nombre;
            apellidosPerfil.value = data.apellido;
            emailPerfil.value = data.email;
        })
        .catch(error => {
            console.log(error);
        });
}

export function cargarUsuarioPerfil() {
    let datos = {
        nombre: nombrePerfil.value,
        apellido: apellidosPerfil.value,
    }

    return datos;
}

export function cargarPasswd() {
    let datos = {
        password: passwdPerfil.value,
    }

    return datos;
}

export function validarDatosPerfil() {
    let esValido = true;
    limpiarErrores();

    if (!validarNombre(nombrePerfil, msgErrorNombre)) {
        esValido = false;
        msgErrorNombre.classList.remove('d-none');
    }

    if (!validarApellido(apellidosPerfil, msgErrorApellido)) {
        esValido = false;
        msgErrorApellido.classList.remove('d-none');
    }

    return esValido;
}

export function validarPasswdPerfilUsu() {
    let esValido = true;
    limpiarErrores();

    if (!validarPasswdPerfil(passwdPerfil, msgErrorPasswd)) {
        esValido = false;
        msgErrorPasswd.classList.remove('d-none');
    }

    return esValido;
}

export function limpiarErrores() {
    msgExito.innerHTML = "";
    msgErrorNombre.innerHTML = "";
    msgErrorApellido.innerHTML = "";
    msgErrorPasswd.innerHTML = "";
    msgExitoFoto.innerHTML = "";

    msgExito.classList.add('d-none');
    msgErrorNombre.classList.add('d-none');
    msgErrorApellido.classList.add('d-none');
    msgErrorPasswd.classList.add('d-none');
    msgExitoFoto.classList.add('d-none');
}

btnActualizarDatos.addEventListener("click", () => {
    let idUsuario = localStorage.getItem("usuarioId");

    if (validarDatosPerfil()) {
        modificarDatosPerfil(cargarUsuarioPerfil(), idUsuario)
            .then(data => {
                if (data.status == 200) {
                    msgExito.textContent = data.message;
                    msgExito.style.color = "green";
                    msgExito.classList.remove('d-none');
                } else {
                    msgExito.textContent = 'Error al actualizar los datos';
                    msgExito.style.color = "red";
                    msgExito.classList.remove('d-none');
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        msgExito.textContent = 'Error al actualizar los datos';
        msgExito.style.color = "red";
    }
});

btnSubirImagen.addEventListener("click", () => {
    let idUsuario = localStorage.getItem("usuarioId");
    console.log(idUsuario);

    let formData = new FormData();
    formData.append("fotoPerfil", fotoPerfil.files[0]);

    modificarFotoPerfil(formData)
        .then(data => {
            if (data.status == 200) {
                console.log(data);
                msgExitoFoto.textContent = 'Imagen subida con éxito.';
                msgExitoFoto.style.color = 'green';
                msgExitoFoto.classList.remove('d-none');
                _Init();
            } else {
                msgExitoFoto.textContent = 'Error al subir la imagen';
                msgExitoFoto.style.color = 'red';
                msgExitoFoto.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.log(error);
        });
});

btnNewPasswd.addEventListener("click", () => {
    let idUsuario = localStorage.getItem("usuarioId");

    if (validarPasswdPerfilUsu()) {
        modificarPasswd(cargarPasswd(), idUsuario)
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    msgExito.textContent = data.message;
                    msgExito.style.color = "green";
                    msgExito.classList.remove('d-none');
                } else if (data.status == 400) {
                    msgExito.textContent = data.error;
                    msgExito.style.color = "red";
                    msgExito.classList.remove('d-none');
                } else {
                    msgExito.textContent = 'Error al cambiar la contraseña';
                    msgExito.style.color = "red";
                    msgExito.classList.remove('d-none');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});

btnCerrarSesion.addEventListener("click", () => {
    let idUsuario = localStorage.getItem("usuarioId");

    cerrarSesion(idUsuario)
        .then(data => {
            console.log(idUsuario);
            console.log(data);
            if (data.status == 200) {
                msgExito.textContent = data.message;
                window.location.href = "login.html";
                msgExito.style.color = "green";
                msgExito.classList.remove('d-none');
            } else {
                msgExito.textContent = 'Error al cerrar sesión';
                msgExito.style.color = "red";
                msgExito.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.log(error);
        });
});

mostrarPasswd.addEventListener("click", function () {
    if (passwdPerfil.type === "password") {
        imgMostrarPasswd.src = "../assets/ojo_abierto.png"
        passwdPerfil.type = "text";
    } else if (passwdPerfil.type === "text") {
        imgMostrarPasswd.src = "../assets/ojo_cerrado.png"
        passwdPerfil.type = "password";
    }
});

_Init();