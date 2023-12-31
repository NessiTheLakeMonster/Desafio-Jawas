/**
 * @author Jaime Ortega
 */

//MANDAR UN LOTE
export async function crearLote() {
    let bodyJSON = JSON.stringify(
        {
            id: datos.id,
            idUsuario: datos.idUsuario,
            lugar_recogida: datos.lugar_recogida,
            entregado: datos.entregado,
            cancelado: datos.cancelado
        }
    )

    let options = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJSON
    }

    const response = await fetch(`http://localhost:8000/api/lote/crear`, options)
    const data = await response.json()
    return data
}

//MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
export async function mostrarLotes(idUsuario) {
    let options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/listar/${idUsuario}`, options)
    const data = await response.json()
    return data
}

//MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
export async function mostrarEntregados(idUsuario) {
    let options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/entregados/${idUsuario}`, options)
    const data = await response.json()
    return data
}

//MOSTRAR LOTE ENTREGADO BUSCADO POR ID
export async function mostrarLote(id) {

    let options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/mostrar/${id}`, options)
    const data = await response.json()
    return data
}

// MANDAR LOTES
export async function mandarLote(id) {
    let options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/mandar/${id}`, options)
    const data = await response.json()
    return data
}

// CANCELAR LOTES
export async function cancelarLote(id) {
    let options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/cancelar/${id}`, options)
    const data = await response.json()
    return data
}
