//MOSTRAR LISTA DE TODAS LAS RECETAS
export async function getRecetas() {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/listar`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR RECETA BUSCADA POR ID    
export async function getReceta(id) {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

//VER INGREDIENTES DE LA RECETA CONCRETA
export async function getIngredientes(id_receta) {

    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/listar/${id_receta}`, options);
    const data = await response.json();
    return data;
}

//MODIFICAR CANTIDAD DE INGREDIENTE DE LA RECETA
export async function modificarIngrediente(datos) {

    let id_receta = localStorage.getItem('recetaId');
    let id_componente = localStorage.getItem('id_componente')

    let bodyJson = JSON.stringify(
        {
            "id_componente": id_componente,
            "cantidad": datos.cantidad
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };
    const response = await fetch(`http://localhost:8000/api/ingrediente/modificar/${id_receta}`, options);
    const data = await response.json();
    return data;
}

//CREAR RECETA NUEVA -> BOTÓN DE CREAR RECETA
export async function recetaNueva(idTipoJoya) {
    //TODO:traerme el usuario de ines
    let idUsuario = localStorage.getItem('usuarioId');

    let bodyJson = JSON.stringify(
        {
            "idUsuario": idUsuario,
            "idTipoJoya": idTipoJoya
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
    const response = await fetch(`http://localhost:8000/api/receta/crear`, option);
    const data = await response.json();

    //guardamos el id de la receta para cuando le metems los ingredientes
    localStorage.setItem('idRecetaNueva', data.id);
    return data;

}

//MOSTRAR LISTA DE JOYAS
export async function getJoyas() {
    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/joya/tipos`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR LISTA DE COMPONENTES
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

// AÑADIR INGREDIENTE A LA RECETA
export async function addIngrediente(id_receta, datos) {

    let bodyJson = JSON.stringify(
        {
            "id_componente": datos.id_componente,
            "cantidad": datos.cantidad
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
    const response = await fetch(`http://localhost:8000/api/ingrediente/crear/${id_receta}`, options);
    const data = await response.json();
    return data;
}

//MOSTRAR INGREDEINTES DE LA RECETA CONCRETA
export async function getIngredientesNuevos(id_receta) {

    var options = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/ingrediente/listar/${id_receta}`, options);
    const data = await response.json();
    return data;
}
