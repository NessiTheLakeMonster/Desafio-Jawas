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

export function validarPasswdMod(newPasswdCampo, msgErrorNewPasswd, oldPasswdCampo, msgErrorOldPasswd) {
    var esValido = false;

    

    return esValido;
}

export function validarCantidad(cantidadCampo, msgErrorCantidad) {
    var esValido = false;

    if (cantidadCampo.value == "") {
        msgErrorCantidad.innerHTML = "El campo cantidad es obligatorio";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else if (!cantidadCampo.numeric) {
        msgErrorCantidad.innerHTML = "El campo cantidad no puede ser alfabético";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else if (cantidadCampo.value < 1 || cantidadCampo.value > 100) {
        msgErrorCantidad.innerHTML = "El campo cantidad debe estar entre 1 y 100";
        msgErrorCantidad.style.color = "red";
        cantidadCampo.style.borderColor = "red";
    } else {
        esValido = true;
    }

    return esValido;
}