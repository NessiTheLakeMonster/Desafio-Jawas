export async function loginUsuario(datos) {
    let body = JSON.stringify(
        {
            email: datos.email,
            password: datos.passwd
        }
    );

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: body
        
    };

    const response = await fetch("http://localhost:8000/api/login", options);
    const data = await response.json();
    return data;
}