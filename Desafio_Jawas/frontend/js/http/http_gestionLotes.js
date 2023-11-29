export async function crearLote() {
    let bodyJSON = JSON.stringify(
        {
            id_usuario: datos.id_usuario,
            lugar_recogida: datos.lugar_recogida,
            entregado: datos.entregado,
            cancelado: datos.cancelado
        }
    )

    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyJSON
    }

    try {
        const response = await fetch("http://localhost:8000/api/lote/crear", options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('ERROR en la solicitud POST para mandar lote', error)
        throw error
    }
}

export async function mostrarLotes() {
    let options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch('http://localhost:8000/api/lote/entregados', options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('ERROR en la solicitud GET para mostrar lotes', error)
        throw error
    }
}

export async function cancelarLote() {
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch('http://localhost:8000/api/lote/cancelar', options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('ERROR en la solicitud DELETE para cancelar lote', error)
        throw error
    }

}
