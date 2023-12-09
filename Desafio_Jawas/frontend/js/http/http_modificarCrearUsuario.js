/**
 * @author Inés Mª Barrera Llerena
 * @summary Función que se encarga de modificar un usuario mediante una petición POST a la API
 * 
 * @param {*} datos 
 * @param {*} idUsuario 
 * @returns data
 */
export async function modificar(datos, idUsuario) {
    let bodyJson = JSON.stringify(
        {
            fotoPerfil: datos.fotoPerfil,
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
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

    const response = await fetch(`http://localhost:8000/api/usuario/modificar/${idUsuario}`, options);
    const data = await response.json();
    return data;
}

/**
 * @author Inés Mª Barrera Llerena
 * @summary Función que se encarga de crear un usuario mediante una petición POST a la API
 * 
 * @param {*} datos 
 * @param {*} idUsuario 
 * @returns data
 */
export async function modificarPasswd(datos, idUsuario) {
    let bodyJson = JSON.stringify(
        {
            password: datos.password,
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

    const response = await fetch(`http://localhost:8000/api/usuario/modPasswd/${idUsuario}`, options);
    const data = await response.json();
    return data;
}