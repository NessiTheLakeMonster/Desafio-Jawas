function initMap() {
    var myLatLng = { lat: 38.69296294925023, lng: -4.1086506843566895 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });

    // Añade un marcador para referencia visual
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });

    // Agrega un escuchador de eventos de clic al mapa
    map.addListener('click', function (event) {
        placeMarker(event.latLng);
    });

    function placeMarker(location) {
        // Elimina el marcador existente
        marker.setMap(null);

        // Crea un nuevo marcador en la ubicación del clic
        marker = new google.maps.Marker({
            position: location,
            map: map
        });

        // Muestra las coordenadas en la consola (puedes hacer lo que quieras con ellas)
        console.log('Coordenadas del clic: ' + location.lat() + ', ' + location.lng());

        // Asigna las coordenadas al objeto window
        window.coordenadas = {
            lat: location.lat(),
            lng: location.lng()
        };
    }
}