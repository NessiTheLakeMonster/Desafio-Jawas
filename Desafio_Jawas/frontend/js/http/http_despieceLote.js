//MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS PARA CLASIFICAR
export async function getLotes() {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/info_lote/listar`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR LOTE ENTREGADO BUSCADO POR ID 
export async function getLote(id) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/info_lote/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR LISTA DE COMPONENTES
export async function getLoteComponentes() {
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

//DESGUAZARÁ Y CLASIFICARÁ EL LOTE
export async function desguaceLote(datos) {
    //ID LOTE REGISTRADO
    let idLote = localStorage.getItem('loteId');
    let bodyJson = JSON.stringify(
        {
            idComponente: datos.idComponente,
            descripcion: datos.descripcion, 
            cantidad: datos.cantidad
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
    const response= await fetch(`http://localhost:8000/api/info_lote/desguazar/${idLote}`, option);
    const data = await response.json();
    return data;

}


//MOSTRAR COMPONENTES DEL LOTE DESGUAZADO
export async function getComponentes(idLote) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/info_lote/listar/${idLote}`, options);
    const data = await response.json();
    return data;
}
