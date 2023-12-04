//MOSTRAR LISTA DE TODOS LOS COMPONENTES
export async function getComponentes() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/componentes/crear`, options);
    const data = await response.json();
    return data;
}