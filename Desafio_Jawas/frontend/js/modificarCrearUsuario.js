import { modificar, modificarPasswd, modificarFotoPerfil, getRoles, asignarRol } from "./http/http_modificarCrearUsuario.js";
import { guardarUsuario, subirImagenUsuario } from "./http/http_registro.js";
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
let lblImagenCrear = document.getElementById('lblImagenCrear');
let imagenCrear = document.getElementById('imagenCrear');

// Botones
const btnEnviar = document.getElementById('btnEnviar');
const btnCambiarPasswd = document.getElementById('cambioPasswd');
const btnCrearUsuario = document.getElementById('btnCrearUsuario');
const btnAddRol = document.getElementById('btnAddRol');
const btnSubirImagen = document.getElementById('btnSubirImagen');
const btnCrearImagen = document.getElementById('btnCrearImagen');

// Mensajes de error
let msgNom = document.getElementById("msgErrorNombre");
let msgApe = document.getElementById("msgErrorApellido");
let msgEmail = document.getElementById("msgErrorEmail");
let msgPasswd = document.getElementById("msgErrorPasswd");
let msgConfPasswd = document.getElementById("msgErrorPasswd2");

// Mensajes de exito
let msgExito = document.getElementById('msgExito');

let formImagen = document.getElementById("formImagen");
let inputImagen = formImagen.elements.namedItem("image");
let msgErrorImagen = document.getElementById("msgErrorImagen");

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
        nombre.value = usuario.nombre;
        apellido.value = usuario.apellido;
        email.value = usuario.email;

        lblImagenCrear.hidden = true;
        imagenCrear.hidden = true;
        btnCrearImagen.hidden = true;

        password.hidden = true;
        email.disabled = true;

        lblNewFoto.textContent = 'Nueva foto de perfil: ';
        lblConfPasswd.textContent = 'Nueva contraseña: ';

    }
}

export function cargarUsuario() {
    var datos = {
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
        msgNom.classList.remove('d-none');
    }

    if (!validarApellido(apellido, msgApe)) {
        esValido = false;
        msgApe.classList.remove('d-none');
    }

    return esValido;
}

// FUNCIONES DE CREAR USUARIO

export function crearUsuario() {
    titulo.textContent = 'Crear Usuario';
    lblImagenCrear.textContent = 'Añade una foto de perfil ';

    btnEnviar.hidden = true;
    btnCambiarPasswd.hidden = true;
    btnCrearUsuario.value = 'Crear';

    selectRoles.hidden = true;
    btnAddRol.hidden = true;

    btnSubirImagen.hidden = true;
    lblNewFoto.hidden = true;
    imgUsuario.hidden = true;
    formImagen.hidden = false;
    newImgUsuario.hidden = true;

    lblPasswd.textContent = 'Contraseña: ';
    lblConfPasswd.textContent = 'Repite la contraseña: ';
    lblNewFoto.textContent = 'Foto de perfil: ';
}

export function validarCrearFormulario() {
    limpiarErrores();
    var esValido = true;

    if (!validarNombre(nombre, msgNom)) {
        esValido = false;
        msgNom.classList.remove('d-none');
    }

    if (!validarApellido(apellido, msgApe)) {
        esValido = false;
        msgApe.classList.remove('d-none');
    }

    if (!validarEmail(email, msgEmail)) {
        esValido = false;
        msgEmail.classList.remove('d-none');
    }

    if (!validarPasswd(password, confPassword, msgPasswd, msgConfPasswd)) {
        esValido = false;
        msgPasswd.classList.remove('d-none');
        msgConfPasswd.classList.remove('d-none');
    }

    return esValido;
}

export function limpiarErrores() {
    msgNom.textContent = "";
    msgApe.textContent = "";
    msgPasswd.textContent = "";
    msgConfPasswd.textContent = "";
    msgExito.textContent = "";
}


// Funciones de ejecución

/**
 * @author Inés Mª Barrera Llerena
 */
export function _Init() {
    msgExito.classList.add('d-none');
    msgErrorImagen.classList.add('d-none');
    msgNom.classList.add('d-none');
    msgApe.classList.add('d-none');
    msgEmail.classList.add('d-none');
    msgPasswd.classList.add('d-none');
    msgConfPasswd.classList.add('d-none');

    if (localStorage.getItem('rol') ==! 'administrador') {
        cargarRoles();
    } else {
        window.location.href = "../html/noPermisos.html";
    }

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

formImagen.addEventListener('submit', function (e) {
    e.preventDefault();
});

// Eventos de los botones
btnEnviar.addEventListener('click', function () {
    limpiarErrores();

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
                msgExito.classList.remove('d-none');

                localStorage.setItem('usuarioSeleccionado', JSON.stringify(data.usuario));
            }
        });
    } else {
        msgExito.textContent = "Por favor, rellene los campos correctamente";
        msgExito.style.display = "block";
        msgExito.style.color = "red";

        msgExito.classList.remove('d-none');
    }
});

btnCrearUsuario.addEventListener('click', function () {

    limpiarErrores();

    if (inputImagen.files.length === 0) {
        msgErrorImagen.textContent = 'Por favor, inserta una imagen.';
        msgErrorImagen.style.color = 'red';
        msgErrorImagen.classList.remove('d-none');
    } else {
        let fotoJoya = inputImagen.files[0];

        let formData = new FormData();
        formData.append('fotoPerfil', fotoJoya)

        console.log(formData.get("fotoPerfil"))
        console.log(formData)

        subirImagenUsuario(formData)
            .then(urlImagen => {
                console.log(urlImagen);
                let url = urlImagen.url;

                let datos = JSON.stringify({
                    fotoPerfil: url,
                    nombre: nombre.value,
                    apellido: apellido.value,
                    email: email.value,
                    password: password.value,
                });
                console.log(datos)

                if (validarCrearFormulario()) {
                    guardarUsuario(datos).then(data => {
                        console.log(data);
                        if (data.status === 200) {
                            localStorage.removeItem('crear');

                            /* window.location.href = 'gestionUsuarios.html'; */
                            msgExito.textContent = "Usuario creado correctamente";
                            msgExito.style.display = "block";
                            msgExito.style.color = "green";

                            msgExito.classList.remove('d-none');

                            localStorage.setItem('usuarioSeleccionado', JSON.stringify(data.usuario));
                        }
                    });
                } else {
                    msgExito.textContent = "Por favor, rellene los campos correctamente";
                    msgExito.style.display = "block";
                    msgExito.style.color = "red";

                    msgExito.classList.remove('d-none');
                }
            });
    }
});


btnCambiarPasswd.addEventListener('click', function () {
    limpiarErrores();

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

                msgExito.classList.remove('d-none');
            }

            if (data.status === 400) {
                msgConfPasswd.textContent = "Las contraseñas son iguales";
                msgConfPasswd.style.display = "block";
                msgConfPasswd.style.color = "red";

                msgConfPasswd.classList.remove('d-none');
            }
        });
    } else {
        msgExito.textContent = "La contraseña no pudo ser modificada";

        msgExito.classList.remove('d-none');
    }
});

btnSubirImagen.addEventListener('click', function () {
    limpiarErrores();

    let idUsuario = localStorage.getItem("idUsuarioSeleccionado");
    console.log(idUsuario);

    let formData = new FormData();
    formData.append("fotoPerfil", newImgUsuario.files[0]);

    modificarFotoPerfil(formData)
        .then(data => {
            if (data.status == 200) {
                msgExito.textContent = data.message;
                msgExito.style.color = "green";

                msgExito.classList.remove('d-none');
            } else {
                msgExito.textContent = 'Error al subir la imagen';
                msgExito.style.color = "red";

                msgExito.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.log(error);
        });
});

btnAddRol.addEventListener('click', function () {
    limpiarErrores();

    let idUsuario = localStorage.getItem("idUsuarioSeleccionado");
    let idRol = selectRoles.value;

    asignarRol(idUsuario, idRol)
        .then(data => {
            if (data.status == 200) {
                msgExito.textContent = data.message;
                msgExito.style.color = "green";

                msgExito.classList.remove('d-none');
            } else if (data.status == 400) {
                msgExito.textContent = data.message;
                msgExito.style.color = "red";

                msgExito.classList.remove('d-none');
            } else {
                msgExito.textContent = 'Error al asignar el rol';
                msgExito.style.color = "red";

                msgExito.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.log(error);
        });
});

_Init();