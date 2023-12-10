import { getUsuario, modificarDatosPerfil, modificarFotoPerfil, modificarPasswd } from "./http/http_perfil.js";
import { validarNombre, validarApellido, validarPasswdPerfil } from "./utils/validaciones.js";

// Datos del html
let imgFotoPerfil = document.getElementById("imgFotoPerfil");
let fotoPerfil = document.getElementById("newFotoPerfil");
let nombrePerfil = document.getElementById("nombrePerfil");
let apellidosPerfil = document.getElementById("apellidosPerfil");
let emailPerfil = document.getElementById("emailPerfil");
let passwdPerfil = document.getElementById("passwdPerfil");

// Botones
const btnActualizarDatos = document.getElementById("btnActualizarDatos");
const btnNewPasswd = document.getElementById("btnNewPasswd");
const btnSubirImagen = document.getElementById("btnSubirImagen");

// Mensajes de error y exito
let msgExito = document.getElementById("msgExito");
let msgErrorNombre = document.getElementById("msgErrorNombre");
let msgErrorApellido = document.getElementById("msgErrorApellidos");
let msgErrorPasswd = document.getElementById("msgErrorPasswd");

export function _Init() {
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
    }

    if (!validarApellido(apellidosPerfil, msgErrorApellido)) {
        esValido = false;
    }

    return esValido;
}

export function validarPasswdPerfilUsu() {
    let esValido = true;
    limpiarErrores();

    if (!validarPasswdPerfil(passwdPerfil, msgErrorPasswd)) {
        esValido = false;
    }

    return esValido;
}

export function limpiarErrores() {
    msgExito.innerHTML = "";
    msgErrorNombre.innerHTML = "";
    msgErrorApellido.innerHTML = "";
    msgErrorPasswd.innerHTML = "";
}

btnActualizarDatos.addEventListener("click", () => {
    let idUsuario = localStorage.getItem("usuarioId");
    console.log(idUsuario);

    if (validarDatosPerfil()) {
        modificarDatosPerfil(cargarUsuarioPerfil(), idUsuario)
            .then(data => {
                if (data.status == 200) {
                    msgExito.textContent = data.message;
                    msgExito.style.color = "green";
                } else {
                    msgExito.textContent = 'Error al actualizar los datos';
                    msgExito.style.color = "red";
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
                msgExito.textContent = data.message;
                msgExito.style.color = "green";
            } else {
                msgExito.textContent = 'Error al subir la imagen';
                msgExito.style.color = "red";
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
                if (data.status == 200) {
                    msgExito.textContent = data.message;
                    msgExito.style.color = "green";
                } else if (data.status == 400) {
                    msgExito.textContent = data.error;
                    msgExito.style.color = "red";
                } else {
                    msgExito.textContent = 'Error al cambiar la contraseña';
                    msgExito.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});

_Init();