// Botones del HTML
const btnGestUsuarios = document.getElementById("btnGestUsuarios");
const btnGestInventario = document.getElementById("btnGestInventario");
const btnDonaciones = document.getElementById("btnDonacion");
const btnDespieceLotes = document.getElementById("btnDespieceLote");
const btnGestJoyas = document.getElementById("btnGestJoyas");
const btnGestRecetas = document.getElementById("btnGestRecetas");
const btnGestComponentes = document.getElementById("btnGestComponentes");

export function ocultarBotonesHome() {
    btnGestUsuarios.hidden = true;
    btnGestInventario.hidden = true;
    btnDonaciones.hidden = true;
    btnDespieceLotes.hidden = true;
    btnGestJoyas.hidden = true;
    btnGestRecetas.hidden = true;
    btnGestComponentes.hidden = true;
}

export function funcionesAdmin() {
    btnGestUsuarios.hidden = false;
    btnGestInventario.hidden = false;
    btnGestComponentes.hidden = false;
}

export function funcionesColaborador() {
    btnDonaciones.hidden = false;
}

export function funcionesDisenador() {
    btnGestJoyas.hidden = false;
    btnGestRecetas.hidden = false;
}

export function funcionesClasificador() {
    btnDespieceLotes.hidden = false;
    btnGestComponentes.hidden = false;
}

function _Init() {
    localStorage.getItem("rol");
    ocultarBotonesHome();

    if (localStorage.getItem("rol") == "administrador") {
        funcionesAdmin();
    } else if (localStorage.getItem("rol") == "colaborador") {
        funcionesColaborador();
    } else if (localStorage.getItem("rol") == "diseñador") {
        funcionesDisenador();
    } else if (localStorage.getItem("rol") == "clasificador") {
        funcionesClasificador();
    }
}

_Init();