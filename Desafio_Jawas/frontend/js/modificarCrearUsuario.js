let titulo = document.getElementById('titulo');
let imgUsuario = document.getElementById('fotoUsuario');
let nombre = document.getElementById('nombreUsuario');
let apellido = document.getElementById('apellidoUsuario');
let email = document.getElementById('emailUsuario');
let password = document.getElementById('passwdUsuario');

// Botones
const btnCrear = document.getElementById('btnEnviar');

// Funciones
export function _Init() {
    if (localStorage.getItem('modificar') === 'true') {
        modificarUsuario();
    }

    if (localStorage.getItem('crear') === 'true') {
        crearUsuario();
    }
}

export function modificarUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuarioSeleccionado'));
    console.log(usuario);
    
    if (usuario) {
        titulo.textContent = 'Modificar Usuario';
        btnCrear.textContent = 'Modificar';
        
        imgUsuario.src = usuario.fotoPerfil;
        nombre.value = usuario.nombre;
        apellido.value = usuario.apellido;
        email.value = usuario.email;
        password.value = usuario.password;
    }
}

_Init();