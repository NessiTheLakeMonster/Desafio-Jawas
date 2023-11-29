export async function getUsuarios() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch("http://localhost:8000/api/usuario/listar", options);
    const data = await response.json();
    return data;
}

export async function getUsuarioById(id) {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/usuario/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

export async function deleteUsuario(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/usuario/eliminar/${id}`, options);
    const data = await response.json();
    return data;
}