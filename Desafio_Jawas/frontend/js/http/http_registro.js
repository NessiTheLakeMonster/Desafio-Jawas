/**
 * Función que se encarga de crear un usuario mediante una petición POST a la API
 * 
 * @author Inés Mª Barrera Llerena
 * @param {*} datos 
 * @returns data
 */
export async function guardarUsuario(datos) {


    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: datos 
    };

    const response = await fetch("http://localhost:8000/api/registro", options);
    const data = await response.json();
    return data;
}
export async function subirImagenUsuario(imagen) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
       
       let response = await fetch("http://localhost:8000/api/subir", { 
         method: "POST",
         body: imagen,
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
       return data

    }