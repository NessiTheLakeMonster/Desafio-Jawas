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
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJSON
    }

    const response = await fetch(`http://localhost:8000/api/lote/crear`, options)
    const data = await response.json()
    return data

}

export async function mostrarLotes(idUsuario) {
    let options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/entregados/${idUsuario}`, options)
    const data = await response.json()
    return data

}

export async function cancelarLote(id) {
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(`http://localhost:8000/api/lote/cancelar/${id}`, options)
    const data = await response.json()
    return data


}