const usuarioGuardado = sessionStorage.getItem('usuario')
const usuario = JSON.parse(usuarioGuardado)

function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
        }
    }
}

let cont = 1

function llenarTablaLotesUsuario() {
    const tablaLotes = document.getElementById('tablaLotes')

    let tr = `
                <tr>
                    <td>${cont}</td>
                    <td>${usuario.nombre}</td>
                    <td>${window.coordenadas.lat + ', ' + window.coordenadas.lng}</td>
                    <td></td>
                    <td></td>
                </tr>
            `
    cont++;
}

// Llama a la función de simulación al cargar la página (esto puede ser en respuesta a alguna acción del usuario)
window.onload = function () {
    move()
};
