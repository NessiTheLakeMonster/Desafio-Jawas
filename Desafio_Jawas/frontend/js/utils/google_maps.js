class Localizacion {
    constructor(callback) {
        if (navigator.geolocation) {
            //Obtenemos ubicación
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitud = position.coords.latitude
                this.longitud = position.coords.longitude

                callback()
            })
        } else {
            alert("Geolocalización no soportada")
        }
    }
}

function initMap() {
    const ubicacion = new Localizacion(() => {
        const options = {
            center: {
                lat: ubicacion.latitud,
                lng: ubicacion.longitud
            },

            zoom: 15
        }

        let map = document.getElementById('map')

        const mapa = new google.maps.Map(map, options)

        // Añadir event listener para el clic en el mapa
        google.maps.event.addListener(map, 'click', (event) => {
            // Obtener latitud y longitud del clic
            const clickedLat = event.latLng.lat();
            const clickedLng = event.latLng.lng();

            // Hacer lo que necesites con la latitud y longitud obtenidas
            console.log(`Latitud: ${clickedLat}, Longitud: ${clickedLng}`);
        });
    })
}
