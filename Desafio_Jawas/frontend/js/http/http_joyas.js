/**
 * @author Patricia Mota
 * @summary llamadas a la api de joyas
 */

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

//MOSTRAR LISTA DE JOYAS
export async function getTipos() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(`http://localhost:8000/api/joya/tipos`, options);
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
export async function modificarImg(formData) {

    let id = localStorage.getItem('joyaId');

    var options = {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: formData
    };
    const response = await fetch(`http://localhost:8000/api/joya/modificar/${id}`, options);
    const data = await response.json();
    return data;
}

//GENERADOR DE JOYAS ALEATORIAS
export async function generarJoya(datos) {

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: datos
    };
    const response = await fetch(`http://localhost:8000/api/joya/generar`, options);
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


//MOSTRAR LISTA DE RECETAS PARA ESA JOYA
export async function getRecetas(idTipoJoya) {

    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/tipo/${idTipoJoya}`, options);
    const data = await response.json();
    return data;
}

//VERIFICAR SI HAY SUFICIENTES COMPONENTES EN EL INVENTARIO Y CUANTAS JOYAS PUEDE HACER
export async function verificarComponentes(idReceta) {

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

export async function subirImagen(imagen) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://127.0.0.1:8000/api/joya/subir", { 
         method: "POST",
         body: imagen,
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       return data

    }