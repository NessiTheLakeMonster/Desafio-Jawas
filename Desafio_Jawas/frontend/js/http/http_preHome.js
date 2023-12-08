export async function mostrarRolesUsuario($idUsuario) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    const response = await fetch(`http://localhost:8000/api/roles/${$idUsuario}`, options);
    const data = await response.json();
    return data;
}