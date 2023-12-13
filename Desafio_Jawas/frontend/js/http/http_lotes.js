/**
 * @author Patricia Mota ft. Inés Barrera
 * @summary llamadas a la api de lotes
 */

//MANDAR LOTE
export async function mandarLote(datos) {

    let bodyJson = JSON.stringify(
        {
            id_usuario: datos.id_usuario,
            latitud: datos.latitud,
            longitud: datos.longitud
        }
    );

    var option = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/lote/crear`, option);
    const data = await response.json();

    localStorage.setItem('idLote', data.id);

    return data;
}

//MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
export async function getLotesEntregados(idUsuario) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"), 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/lote/entregados/${idUsuario}`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR LOTE ENTREGADO BUSCADO POR ID 
export async function getLoteEntregado(id,idUsuario ) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/lote/mostrar/${id}/${idUsuario}`, options);
    const data = await response.json();
    return data;
}

//CANCELAR LOTES
export async function cancelarLote(id) {

    var options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"), 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/lote/cancelar/${id}`, options);
    const data = await response.json();
    return data;
}