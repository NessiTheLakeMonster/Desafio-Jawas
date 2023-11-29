export async function guardarUsuario(datos) {
    let bodyJson = JSON.stringify(
        {
            fotoPerfil: datos.fotoPerfil,
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            password: datos.passwd,
            password_confirmation: datos.confPasswd
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

    const response = await fetch("http://127.0.0.1:8000/api/registro", options);
    const data = await response.json();
    return data;
}