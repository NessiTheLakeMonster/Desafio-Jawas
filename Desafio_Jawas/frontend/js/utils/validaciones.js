/**
 * @file validaciones.js
 * @author Inés Mª Barrera Llerena
 * 
 * @summary Contiene las funciones para validar los campos del formulario
 */

// Expresiones regulares para validar los campos del formulario
const regexNomYAp = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regexEmail = /(^[a-zA-Z0-9_]+)@+([a-z]+).([a-z]){2,5}/;
const regexPasswd = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]?\/\\|-]{6,12}$/;
const regexDescripcion = /^[A-Za-z\s]+$/;
const regexCantidad = /^[0-9]+$/;
const regexComponente = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regexHardware = /^[01]$/;


// Función para validar los campos del formulario

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función que se encarga de validar el campo nombre del formulario
 * 
 * @param {*} nombreCampo 
 * @param {*} msgErrorNombre 
 * @returns boolean esValido
 */
export function validarNombre(nombreCampo, msgErrorNombre) {
    var esValido = false;

    if (nombreCampo.value == "") {
        msgErrorNombre.innerHTML = "El campo nombre es obligatorio";
        msgErrorNombre.style.color = "red";
        nombreCampo.style.borderColor = "red";
    } else if (!regexNomYAp.test(nombreCampo.value)) {
        msgErrorNombre.innerHTML = "El campo nombre no es válido";
        msgErrorNombre.style.color = "red";
        nombreCampo.style.borderColor = "red";
    } else {
        esValido = true;
        nombreCampo.style.borderColor = "green";
    }

    return esValido;
}

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función que se encarga de validar el campo apellido del formulario
 * 
 * @param {*} apellidoCampo 
 * @param {*} msgErrorApellido 
 * @returns boolean esValido 
 */
export function validarApellido(apellidoCampo, msgErrorApellido) {
    var esValido = false;

    if (apellidoCampo.value == "") {
        msgErrorApellido.innerHTML = "El campo apellido es obligatorio";
        msgErrorApellido.style.color = "red";
        apellidoCampo.style.borderColor = "red";
    } else if (!regexNomYAp.test(apellidoCampo.value)) {
        msgErrorApellido.innerHTML = "El campo apellido no es válido";
        msgErrorApellido.style.color = "red";
        apellidoCampo.style.borderColor = "red";
    } else {
        esValido = true;
        apellidoCampo.style.borderColor = "green";
    }

    return esValido;
}

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función que se encarga de validar el campo email del formulario
 * 
 * @param {*} emailCampo 
 * @param {*} msgErrorEmail 
 * @returns boolean esValido 
 */
export function validarEmail(emailCampo, msgErrorEmail) {
    var esValido = false;

    if (emailCampo.value == "") {
        msgErrorEmail.innerHTML = "El campo email es obligatorio";
        msgErrorEmail.style.color = "red";
        emailCampo.style.borderColor = "red";
    } else if (!regexEmail.test(emailCampo.value)) {
        msgErrorEmail.innerHTML = "El campo email no es válido";
        msgErrorEmail.style.color = "red";
        emailCampo.style.borderColor = "red";
    } else {
        esValido = true;
        emailCampo.style.borderColor = "green";
    }

    return esValido;
}

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función para validar los campos de contraseña y confirmar contraseña en el registro
 * 
 * @param {*} passwdCampo 
 * @param {*} confPasswdCampo 
 * @param {*} msgErrorPasswd 
 * @param {*} msgErrorConfPasswd 
 * @returns boolean esValido 
 */
export function validarPasswd(passwdCampo, confPasswdCampo, msgErrorPasswd, msgErrorConfPasswd) {
    var esValido = false;

    if (passwdCampo.value == "") {
        msgErrorPasswd.textContent = "El campo contraseña no puede estar vacío";
        msgErrorPasswd.style.display = "block";
        msgErrorPasswd.style.color = "red";
    } else if (!regexPasswd.test(passwdCampo.value)) {
        msgErrorPasswd.textContent = "La contraseña no es válida";
        msgErrorPasswd.style.display = "block";
        msgErrorPasswd.style.color = "red";
    } else if (passwdCampo.value != confPasswdCampo.value) {
        msgErrorConfPasswd.textContent = "Las contraseñas no coinciden";
        msgErrorConfPasswd.style.display = "block";
        msgErrorConfPasswd.style.color = "red";
    } else if (confPasswdCampo.value == "") {
        msgErrorConfPasswd.textContent = "El campo confirmar contraseña no puede estar vacío";
        msgErrorConfPasswd.style.display = "block";
        msgErrorConfPasswd.style.color = "red";
    } else {
        esValido = true;
    }

    return esValido;
}

export function validarPasswdPerfil(passwdCampo, msgErrorPasswd) {
    var esValido = false;

    if (passwdCampo.value == "") {
        msgErrorPasswd.innerHTML = "El campo contraseña es obligatorio";
        msgErrorPasswd.style.color = "red";
        passwdCampo.style.borderColor = "red";
    } else if (!regexPasswd.test(passwdCampo.value)) {
        msgErrorPasswd.innerHTML = "El campo contraseña no es válido";
        msgErrorPasswd.style.color = "red";
        passwdCampo.style.borderColor = "red";
    } else {
        esValido = true;
        passwdCampo.style.borderColor = "green";
    }

    return esValido;
}

//Función para validar las descripciones de los componentes
export function validarDescripcion(descripcionCampo, msgErrorDescripcion) {
    var esValido = false;

    if (descripcionCampo.value == "") {
        msgErrorDescripcion.innerHTML = "El campo descripción es obligatorio";
        msgErrorDescripcion.style.color = "red";
        descripcionCampo.style.borderColor = "red";
    } else if (!regexDescripcion.test(descripcionCampo.value)) {
        msgErrorDescripcion.innerHTML = "El campo descripción no es válido";
        msgErrorDescripcion.style.color = "red";
        descripcionCampo.style.borderColor = "red";
    } else {
        esValido = true;
        descripcionCampo.style.borderColor = "green";
    }
    return esValido;
}

export function validarCantidad(cantidadCampo, msgErrorCantidad) {
    var esValido = false;

    if (cantidadCampo.value == "") {
        msgErrorCantidad.innerHTML = "El campo cantidad es obligatorio";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else if (!regexCantidad.test(cantidadCampo.value)) {
        msgErrorCantidad.innerHTML = "El campo cantidad no es válido";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else if (cantidadCampo.value <= 0 || cantidadCampo.value >= 100) {
        msgErrorCantidad.innerHTML = "La cantidad debe ser mayor que 0 y menor que 100";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else {
        esValido = true;
        cantidadCampo.style.borderColor = "green";
    }

    return esValido;
}

export function validarNombreHardware(nombre, msgErrorNombre) {
    var esValido = false;

    if (nombre.value == "") {
        msgErrorNombre.innerHTML = "El campo nombre es obligatorio";
        msgErrorNombre.style.color = "red";
        nombre.style.borderColor = "red";
    } else if (!regexComponente.test(nombre.value)) {
        msgErrorNombre.innerHTML = "El campo nombre no es válido";
        msgErrorNombre.style.color = "red";
        nombre.style.borderColor = "red";
    } else {
        esValido = true;
        nombre.style.borderColor = "green";
    }

    return esValido;
}

export function validarHardware(hardware, msgErrorHardware) {
    var esValido = false;

    if (hardware.value == "") {
        msgErrorHardware.innerHTML = "El campo hardware es obligatorio";
        msgErrorHardware.style.color = "red";
        hardware.style.borderColor = "red";
    } else if (!regexHardware.test(hardware.value)) {
        msgErrorHardware.innerHTML = "El campo hardware no es válido";
        msgErrorHardware.style.color = "red";
        hardware.style.borderColor = "red";
    } else {
        esValido = true;
        hardware.style.borderColor = "green";
    }

    return esValido;
}
