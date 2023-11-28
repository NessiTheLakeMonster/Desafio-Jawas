export async function getUsuarios() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch("http://localhost:8000/api/usuario/listar", options);
    const data = await response.json();
    return data;
}