export async function getUsuario($idUsuario) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/perfil/buscar/${$idUsuario}`, options);
    const data = await response.json();
    return data;
}

export async function modificarFotoPerfil(formData) {

    let idUsuario = localStorage.getItem("usuarioId");

    var options = {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/perfil/modificarFoto/${idUsuario}`, options);
    const data = await response.json();
    return data;
}

export async function modificarDatosPerfil($datos, $idUsuario) {
    let bodyJson = JSON.stringify(
        {
            nombre: $datos.nombre,
            apellido: $datos.apellido,
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    }

    const response = await fetch(`http://localhost:8000/api/perfil/modificar/${$idUsuario}`, options);
    const data = await response.json();
    return data;
}

export async function modificarPasswd($datos, $idUsuario) {
    let bodyJson = JSON.stringify(
        {
            password: $datos.password,
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    }

    const response = await fetch(`http://localhost:8000/api/perfil/modPasswd/${$idUsuario}`, options);
    const data = await response.json();
    return data;
}