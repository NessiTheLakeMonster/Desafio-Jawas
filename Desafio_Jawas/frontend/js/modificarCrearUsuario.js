import { modificar, modificarPasswd } from "./http/http_modificarCrearUsuario.js";
import { guardarUsuario } from "./http/http_registro.js";

// Variables de los campos del formulario del HTML
let titulo = document.getElementById('titulo');
let imgUsuario = document.getElementById('fotoUsuario');
let newImgUsuario = document.getElementById('nuevaFoto');
let nombre = document.getElementById('nombreUsuario');
let apellido = document.getElementById('apellidoUsuario');
let email = document.getElementById('emailUsuario');
let password = document.getElementById('passwdUsuario');
let confPassword = document.getElementById('passwdUsuario2');

// Labels
let lblNewFoto = document.getElementById('lblNewFoto');
let lblPasswd = document.getElementById('lblPasswdUsuario');
let lblConfPasswd = document.getElementById('lblPasswdUsuario2');

// Botones
const btnEnviar = document.getElementById('btnEnviar');
const btnCambiarPasswd = document.getElementById('cambioPasswd');

let usuario;

// Funciones de Modificación del Usuario

export function modificarUsuario() {
    console.log(usuario);

    if (usuario) {
        titulo.textContent = 'Modificar Usuario';

        btnEnviar.value = 'Actualizar Datos';
        btnCambiarPasswd.value = 'Cambiar contraseña';

        imgUsuario.src = usuario.fotoPerfil;
        newImgUsuario.value = usuario.fotoPerfil;
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

// Funciones de Creación del Usuario

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

// Funciones de ejecución

/**
 * @author Inés Mª Barrera Llerena
 */
export function _Init() {
    if (localStorage.getItem('modificar') === 'true') {
        usuario = JSON.parse(localStorage.getItem('usuarioSeleccionado'));
        modificarUsuario();
    }

    if (localStorage.getItem('crear') === 'true') {
        crearUsuario();
    }
}

// Eventos de los botones
btnEnviar.addEventListener('click', function () {
    if (btnEnviar.value === 'Crear') {
        guardarUsuario(agregarUsuario()).then(data => {
            console.log(data);
            if (data === 'Usuario creado') {
                /* window.location.href = 'gestionUsuarios.html'; */
                alert('Usuario creado');
            }
        });
    } else if (btnEnviar.value === 'Actualizar Datos') { 
        modificar(cargarUsuario(), usuario.id).then(data => {
            console.log(data);
            if (data === 'Usuario modificado') {
                localStorage.removeItem('usuarioSeleccionado');
                localStorage.removeItem('modificar');
                /* window.location.href = 'gestionUsuarios.html'; */
                alert('Usuario modificado');
            }
        });
    }
});

btnCambiarPasswd.addEventListener('click', function () {
    if (confPassword.value !== '') {
        modificarPasswd(cargarPasswd(), usuario.id).then(data => {
            console.log(usuario.id);
            console.log(data);
            if (data === 'Contraseña modificada') {
                /* window.location.href = 'gestionUsuarios.html'; */
                alert('Contraseña modificada');
            }
        });
    } else {
        alert('Por favor, introduce una contraseña');
    }
});

_Init();