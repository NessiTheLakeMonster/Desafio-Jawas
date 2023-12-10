export async function getInventario() {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    let response = await fetch('http://localhost:8000/api/inventario/mostrar', options);
    let data = await response.json();
    return data;
}

export async function modificarInventario(id, data) {
    let bodyJSON = JSON.stringify(
        {
            "cantidad": data.cantidad
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJSON
    };

    let response = await fetch(`http://localhost:8000/api/inventario/modificar/${id}`, options);
    let result = await response.json();
    return result;
}

