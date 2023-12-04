export async function getInventario() {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let response = await fetch('http://localhost:8000/api/inventario/mostrar', options);
    let data = await response.json();
    return data;
}

