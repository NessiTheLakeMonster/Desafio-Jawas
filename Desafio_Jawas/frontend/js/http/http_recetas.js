//MOSTRAR LISTA DE TODAS LAS RECETAS
export async function getRecetas() {
    var options = {
        method: 'GET',
        headers: {
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
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/listar/${id_receta}`, options);
    const data = await response.json();
    return data;
}

//CREAR RECETA NUEVA -> BOTÓN DE CREAR RECETA
export async function recetaNueva() {
    let idUsuario = localStorage.getItem('usuarioId'); 

    let bodyJson = JSON.stringify(
        {
            "idUsuario": idUsuario
        }
    );
    
    var option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson 
    };
    const response = await fetch(`http://localhost:8000/api/receta/crear`, option);
    const data = await response.json();
    return data;

}

// AÑADIR INGREDIENTE A LA RECETA
export async function addIngrediente(id_receta, datos) {

    //let id_receta = localStorage.getItem('recetaId');

    let bodyJson = JSON.stringify(
        {   
            "id_componente": datos.id_componente,
            "cantidad": datos.cantidad
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
    const response = await fetch(`http://localhost:8000/api/ingrediente/crear/${id_receta}`, options);
    const data = await response.json();
    return data;
}
