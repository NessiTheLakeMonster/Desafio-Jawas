//MOSTRAR LISTA DE TODAS LAS RECETAS
export async function getRecetas() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/listar`, options);
    const data = await response.json();
    console.log(data);
    return data;
}

//MOSTRAR RECETA BUSCADA POR ID    
export async function getReceta() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/mostrar/${id}`, options);
    const data = await response.json();
    return data;
}

//VER INGREDIENTES DE LA RECETA CONCRETA
export async function getIngredientes() {
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(`http://localhost:8000/api/receta/crear`, options);
    const data = await response.json();
    return data;
}

//CREAR RECETA NUEVA -> BOTÓN DE CREAR RECETA
export async function recetaNueva(datos) {

    let bodyJson = JSON.stringify(
        {
            "id": datos.id,
            "idUsuario": datos.idUsuario,
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
    const response= await fetch(`http://localhost:8000/api/info_lote/desguazar/${idLote}`, option);
    const data = await response.json();
    return data;

}