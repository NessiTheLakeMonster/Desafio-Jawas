//MOSTRAR LISTA DE TODAS LAS JOYAS
export async function getJoyas() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/joya/listar`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR JOYA BUSCADA POR ID
export async function getJoya(id) {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/joya/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

//MODIFICAR LA IMG DE LA JOYA
export async function modificarImg(datos) {

    let id = localStorage.getItem('joyaId');

    let bodyJson = JSON.stringify(
        {
            "foto": datos.foto
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/joya/modificar/${id}`, options);
    const data = await response.json();
    return data;
}

 //GENERADOR DE JOYAS ALEATORIAS
export async function generarJoya(datos) {

    let bodyJson = JSON.stringify(
        {
            "nombre": datos.nombre,

        }
    );

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/joya/generar`, options);
    const data = await response.json();
    return data;
}

 //VERIFICAR SI HAY SUFICIENTES COMPONENTES EN EL INVENTARIO Y CUANTAS JOYAS PUEDE HACER

export async function verificarComponentes() {

    let idReceta = localStorage.getItem('idReceta');

    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/joya/componentes/${idReceta}`, options);
    const data = await response.json();
    return data;

}

//MOSTRAR INVENTARIO
export async function getInventario() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/inventario/mostrar`, options);
    const data = await response.json();
    return data;
}