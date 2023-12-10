import { modificar, modificarPasswd, modificarFotoPerfil, getRoles, asignarRol } from "./http/http_modificarCrearUsuario.js";
import { guardarUsuario } from "./http/http_registro.js";
import { validarNombre, validarApellido, validarPasswd, validarEmail } from "./utils/validaciones.js";

// Variables de los campos del formulario del HTML
let titulo = document.getElementById('titulo');
let imgUsuario = document.getElementById('fotoUsuario');
let newImgUsuario = document.getElementById('nuevaFoto');
let nombre = document.getElementById('nombreUsuario');
let apellido = document.getElementById('apellidoUsuario');
let email = document.getElementById('emailUsuario');
let password = document.getElementById('passwdUsuario');
let confPassword = document.getElementById('passwdUsuario2');

let selectRoles = document.getElementById('selectRoles');

// Labels
let lblNewFoto = document.getElementById('lblNewFoto');
let lblPasswd = document.getElementById('lblPasswdUsuario');
let lblConfPasswd = document.getElementById('lblPasswdUsuario2');

// Botones
const btnEnviar = document.getElementById('btnEnviar');
const btnCambiarPasswd = document.getElementById('cambioPasswd');
const btnCrearUsuario = document.getElementById('btnCrearUsuario');
const btnAddRol = document.getElementById('btnAddRol');
const btnSubirImagen = document.getElementById('btnSubirImagen');

// Mensajes de error
let msgFoto = document.getElementById("msgErrorFoto");
let msgNom = document.getElementById("msgErrorNombre");
let msgApe = document.getElementById("msgErrorApellido");
let msgEmail = document.getElementById("msgErrorEmail");
let msgPasswd = document.getElementById("msgErrorPasswd");
let msgConfPasswd = document.getElementById("msgErrorPasswd2");

// Mensajes de exito
let msgExito = document.getElementById("msgExito");

let usuario;

// FUNCIONES DE MODIFICAR USUARIO

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función encargada de cambiar el HTML para modificar un usuario
 */
export function modificarUsuario() {
    console.log(usuario);

    if (usuario) {
        titulo.textContent = 'Modificar Usuario';

        btnEnviar.value = 'Actualizar Datos';
        btnCambiarPasswd.value = 'Cambiar contraseña';
        btnCrearUsuario.hidden = true;
        btnAddRol.value = 'Añadir rol';

        imgUsuario.src = usuario.fotoPerfil;
        /* newImgUsuario.value = usuario.fotoPerfil; */
        nombre.value = usuario.nombre;
        apellido.value = usuario.apellido;
        email.value = usuario.email;

        password.hidden = true;
        email.disabled = true;

        lblNewFoto.textContent = 'Nueva foto de perfil: ';
        lblConfPasswd.textContent = 'Nueva contraseña: ';
    }
}

export function cargarUsuario() {
    var datos = {
        /* fotoPerfil: imgUsuario.src, */ // FIXME queda pendiente meter la foto
        fotoPerfil: newImgUsuario.value,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value
    };

    console.log(datos);
    return datos;
}

export function cargarPasswd() {
    var datos = {
        password: confPassword.value
    };

    return datos;
}

export function validarModificarFormulario() {
    limpiarErrores();
    var esValido = true;

    if (!validarNombre(nombre, msgNom)) {
        esValido = false;
    }

    if (!validarApellido(apellido, msgApe)) {
        esValido = false;
    }

    return esValido;
}

// FUNCIONES DE CREAR USUARIO

export function crearUsuario() {
    titulo.textContent = 'Crear Usuario';

    btnEnviar.value = 'Crear'
    btnCambiarPasswd.hidden = true;

    lblPasswd.textContent = 'Contraseña: ';
    lblConfPasswd.textContent = 'Repite la contraseña: ';
    lblNewFoto.textContent = 'Foto de perfil: ';
}

export function agregarUsuario() {
    let datos = {
        /* fotoPerfil: imgUsuario.src, */ // FIXME queda pendiente meter la foto
        fotoPerfil: newImgUsuario.value,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        passwd: password.value,
        confPasswd: confPassword.value
    };

    return datos;
}

export function validarCrearFormulario() {
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

    if (!validarPasswd(password, confPassword, msgPasswd, msgConfPasswd)) {
        esValido = false;
    }

    return esValido;
}

export function limpiarErrores() {
    msgFoto.textContent = "";
    msgNom.textContent = "";
    msgApe.textContent = "";
    msgPasswd.textContent = "";
    msgConfPasswd.textContent = "";
    msgExito.textContent = "";

    nombre.style.borderColor = "none";
    apellido.style.borderColor = "none";
    password.style.borderColor = "none";
    confPassword.style.borderColor = "none";
    email.style.borderColor = "none";
}


// Funciones de ejecución

/**
 * @author Inés Mª Barrera Llerena
 */
export function _Init() {
    if (localStorage.getItem('modificar') === 'true') {
        usuario = JSON.parse(localStorage.getItem('usuarioSeleccionado'));
        modificarUsuario();
        cargarRoles();
    }

    if (localStorage.getItem('crear') === 'true') {
        crearUsuario();
    }
}

export function cargarRoles() {
    getRoles().then(data => {
        console.log(data);
        selectRoles.innerHTML = crearSelectRoles(data);
    });
}

export function crearSelectRoles(roles) {
    return roles.map(rol => {
        return `
            <option value="${rol.id}">${rol.nombre}</option>
        `;
    }).join('');
}

// Eventos de los botones
btnEnviar.addEventListener('click', function () {
    if (btnEnviar.value === 'Crear') {

        if (validarCrearFormulario()) {
            guardarUsuario(agregarUsuario()).then(data => {
                console.log(data);
                if (data.status === 200) {
                    localStorage.removeItem('crear');

                    /* window.location.href = 'gestionUsuarios.html'; */
                    msgExito.textContent = "Usuario creado correctamente";
                    msgExito.style.display = "block";
                    msgExito.style.color = "green";

                    localStorage.setItem('usuarioSeleccionado', JSON.stringify(data.usuario));
                }
            });
        } else {
            msgExito.textContent = "Por favor, rellene los campos correctamente";
            msgExito.style.display = "block";
            msgExito.style.color = "red";
        }

    } else if (btnEnviar.value === 'Actualizar Datos') {

        if (validarModificarFormulario()) {
            modificar(cargarUsuario(), usuario.id).then(data => {
                console.log(data);
                if (data.status === 200) {
                    localStorage.removeItem('usuarioSeleccionado');
                    localStorage.removeItem('modificar');

                    /* window.location.href = 'gestionUsuarios.html'; */
                    msgExito.textContent = "Usuario modificado correctamente";
                    msgExito.style.display = "block";
                    msgExito.style.color = "green";

                    localStorage.setItem('usuarioSeleccionado', JSON.stringify(data.usuario));
                }
            });
        } else {
            msgExito.textContent = "Por favor, rellene los campos correctamente";
            msgExito.style.display = "block";
            msgExito.style.color = "red";
        }
    }
});

btnCambiarPasswd.addEventListener('click', function () {
    if (confPassword.value !== '') {
        modificarPasswd(cargarPasswd(), usuario.id).then(data => {
            console.log(usuario.id);
            console.log(data);
            if (data.status === 200) {
                localStorage.removeItem('usuarioSeleccionado');
                localStorage.removeItem('modificar');

                /* window.location.href = 'gestionUsuarios.html'; */
                msgExito.textContent = "Contraseña modificada correctamente";
                msgExito.style.display = "block";
                msgExito.style.color = "green";
            }

            if (data.status === 400) {
                msgConfPasswd.textContent = "Las contraseñas son iguales";
                msgConfPasswd.style.display = "block";
                msgConfPasswd.style.color = "red";
            }
        });
    } else {
        msgExito.textContent = "La contraseña no pudo ser modificada";
    }
});

btnSubirImagen.addEventListener('click', function () {
    let idUsuario = localStorage.getItem("idUsuarioSeleccionado");
    console.log(idUsuario);

    let formData = new FormData();
    formData.append("fotoPerfil", newImgUsuario.files[0]);

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

btnAddRol.addEventListener('click', function () {
    let idUsuario = localStorage.getItem("idUsuarioSeleccionado");
    let idRol = selectRoles.value;

    asignarRol(idUsuario, idRol)
        .then(data => {
            if (data.status == 200) {
                msgExito.textContent = data.message;
                msgExito.style.color = "green";
            } else if (data.status == 400) {
                msgExito.textContent = data.message;
                msgExito.style.color = "red";
            } else {
                msgExito.textContent = 'Error al asignar el rol';
                msgExito.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
        });
});

_Init();