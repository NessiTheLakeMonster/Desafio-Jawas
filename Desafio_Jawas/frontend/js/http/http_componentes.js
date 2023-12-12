//MOSTRAR LISTA DE TODOS LOS COMPONENTES
export async function getComponentes() {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/componentes/listar`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR LISTA DE COMPONENTES POR ID
export async function getComponente(id) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/componentes/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

//CREAR COMPONENTE
export async function addComponente(datos) {

    let bodyJson = JSON.stringify(
        {
            nombre: datos.nombre,
            hardware: datos.hardware,
        }
    );
    var options = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/componentes/crear`, options);
    const data = await response.json();
    return data;
}

export async function eliminarComponente(idComponente) {
    var options = {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    let response = await fetch(`http://localhost:8000/api/componentes/eliminar/${idComponente}`, options);
    let result = await response.json();
    return result;
}