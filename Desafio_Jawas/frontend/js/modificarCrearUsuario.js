import { modificar } from "./http/http_modificarCrearUsuario.js";
import { guardarUsuario } from "./http/http_registro.js";

let titulo = document.getElementById('titulo');
let imgUsuario = document.getElementById('fotoUsuario');
let nombre = document.getElementById('nombreUsuario');
let apellido = document.getElementById('apellidoUsuario');
let email = document.getElementById('emailUsuario');
let password = document.getElementById('passwdUsuario');
let confPassword = document.getElementById('passwdUsuario2');
let lblPasswd = document.getElementById('lblPasswdUsuario2');

// Botones
const btnCrear = document.getElementById('btnEnviar');

let usuario;

// Funciones

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

export function modificarUsuario() {
    console.log(usuario);

    if (usuario) {
        titulo.textContent = 'Modificar Usuario';
        btnCrear.value = 'Modificar';

        imgUsuario.src = usuario.fotoPerfil;
        nombre.value = usuario.nombre;
        apellido.value = usuario.apellido;
        email.value = usuario.email;
        email.disabled = true;
        password.value = usuario.password;
        lblPasswd.textContent = 'Nueva contraseña: ';
    }
}

/* export function cargarUsuario() {
    var datos = {
        fotoPerfil: imgUsuario.src,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        passwd: password.value
    };

    return datos;
} */

export function agregarUsuario() {
    let datos = {
        fotoPerfil: imgUsuario.src,
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        passwd: password.value,
        confPasswd: confPassword.value
    };

    return datos;
}

export function crearUsuario() {
    titulo.textContent = 'Crear Usuario';
    btnCrear.value = 'Crear'
    lblPasswd.textContent = 'Repite la contraseña: ';
}

btnCrear.addEventListener('click', () => {
    if (btnCrear.value === 'Crear') {
        guardarUsuario(agregarUsuario()).then(data => {
            console.log(data);
        });
    } else if (btnCrear.value === 'Modificar') {
        modificar(cargarUsuario(),usuario.id).then(data => {
            console.log(data);
        });
    }
});

_Init();