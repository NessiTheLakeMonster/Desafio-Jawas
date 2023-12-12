import { validarNombre, validarApellido, validarEmail, validarPasswd } from "./utils/validaciones.js";
import { guardarUsuario, subirImagenUsuario } from "./http/http_registro.js";

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
let msgExitoFoto = document.getElementById("msgExitoFoto");

// Mensaje de creación de cuenta
let msgCuentaCreada = document.getElementById("msgExito");

// Botón de registro
const btnRegistro = document.getElementById("btnRegistro");
const mostrarPasswd1 = document.getElementById("mostrarPasswd1");
const mostrarPasswd2 = document.getElementById("mostrarPasswd2");

let imgMostrarPasswd1 = document.getElementById("imgMostrarPasswd1");
let imgMostrarPasswd2 = document.getElementById("imgMostrarPasswd2");

let formImagen = document.getElementById("formImagen");
let inputImagen = formImagen.elements.namedItem("image");
let msgErrorImagen = document.getElementById("msgErrorImagen");

// Funciones
export function validar() {
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

    if (!validarPasswd(passwd, confPasswd, msgPasswd, msgConfPasswd)) {
        esValido = false;
        msgPasswd.classList.remove('d-none');
        msgConfPasswd.classList.remove('d-none');
    }

    return esValido;
}

export function limpiarErrores() {
    msgNom.textContent = "";
    msgNom.classList.add('d-none');
    msgApe.textContent = "";
    msgApe.classList.add('d-none');
    msgEmail.textContent = "";
    msgEmail.classList.add('d-none');
    msgPasswd.textContent = "";
    msgPasswd.classList.add('d-none');
    msgConfPasswd.textContent = "";
    msgConfPasswd.classList.add('d-none');
    msgCuentaCreada.textContent = "";
    msgCuentaCreada.classList.add('d-none');
    msgErrorImagen.textContent = "";
    msgErrorImagen.classList.add('d-none');
}

export function _Init() {
    msgNom.classList.add('d-none');
    msgApe.classList.add('d-none');
    msgEmail.classList.add('d-none');
    msgPasswd.classList.add('d-none');
    msgConfPasswd.classList.add('d-none');
    msgCuentaCreada.classList.add('d-none');
    msgErrorImagen.classList.add('d-none');
    msgExitoFoto.classList.add('d-none');

    btnRegistro.disabled = true;
}

// Eventos
formImagen.addEventListener('submit', function (e) {
    e.preventDefault();
    btnRegistro.disabled = false;
});

btnRegistro.addEventListener("click", function (e) {
    e.preventDefault();

    if (inputImagen.files.length === 0) {
        msgErrorImagen.textContent = 'Por favor, inserta una imagen.';
        msgErrorImagen.style.color = 'red';
        msgErrorImagen.classList.remove('d-none');
    } else {
        let fotoJoya = inputImagen.files[0];

        let formData = new FormData();
        formData.append('fotoPerfil', fotoJoya)
        
        msgExitoFoto.textContent = 'Imagen subida con éxito.';
        msgExitoFoto.style.color = 'green';
        msgExitoFoto.classList.remove('d-none');

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
                    password: passwd.value,
                });
                console.log(datos)

                if (validar()) {
                    guardarUsuario(datos)
                        .then(data => {
                            console.log(data);
                            if (data.status == 200) {
                                msgCuentaCreada.innerHTML = "Cuenta creada con éxito";
                                msgCuentaCreada.style.color = "green";
                                window.location.href = "login.html";
                                msgCuentaCreada.classList.remove('d-none');
                            } else {
                                msgCuentaCreada.innerHTML = "Error al crear la cuenta";
                                msgCuentaCreada.style.color = "red";
                                msgCuentaCreada.classList.remove('d-none');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    msgCuentaCreada.innerHTML = "Error al crear la cuenta";
                    msgCuentaCreada.style.color = "red";
                }
            });

    }
});

mostrarPasswd1.addEventListener("click", function (e) {
    if (passwd.type == "password") {
        passwd.type = "text";
        imgMostrarPasswd1.src = "../assets/ojo_abierto.png";
    } else if (passwd.type == "text") {
        passwd.type = "password";
        imgMostrarPasswd1.src = "../assets/ojo_cerrado.png";
    }
});

mostrarPasswd2.addEventListener("click", function (e) {
    if (confPasswd.type == "password") {
        confPasswd.type = "text";
        imgMostrarPasswd2.src = "../assets/ojo_abierto.png";
    } else if (confPasswd.type == "text") {
        confPasswd.type = "password";
        imgMostrarPasswd2.src = "../assets/ojo_cerrado.png";
    }
});

_Init();