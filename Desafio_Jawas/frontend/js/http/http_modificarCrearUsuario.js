/**
 * Función que se encarga de crear un usuario mediante una petición POST a la API
 * 
 * @author Inés Mª Barrera Llerena
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
            password: datos.passwd
        }
    );

    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: bodyJson
    };

    const response = await fetch(`http://localhost:8000/api/usuario/modificar/${idUsuario}`, options);
    const data = await response.json();
    return data;
}