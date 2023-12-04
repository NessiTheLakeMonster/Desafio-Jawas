/**
 * @author Jaime Ortega
 */

let latitud
let longitud

function initMap() {
    var myLatLng = { lat: 38.69296294925023, lng: -4.1086506843566895 }
    console.log('Coordenadas originales: ' + myLatLng.lat + ', ' + myLatLng.lng)

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    })

    // Añade un marcador para referencia visual
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    })

    // Agrega un escuchador de eventos de clic al mapa
    map.addListener('click', function (event) {
        placeMarker(event.latLng)
        sessionStorage.setItem('latitud', latitud)
        sessionStorage.setItem('longitud', longitud)
    })

    function placeMarker(location) {
        // Elimina el marcador existente
        marker.setMap(null)

        // Crea un nuevo marcador en la ubicación del clic
        marker = new google.maps.Marker({
            position: location,
            map: map
        })

        latitud = location.lat()
        longitud = location.lng()
    }
}
