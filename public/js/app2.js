function initMap(){
    let latLong = {lat: -25.344, lng: 131.036};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: latLong});
    let marker = new google.maps.Marker({position: latLong, map: map});
};

console.log('Running from inside app2.js');
