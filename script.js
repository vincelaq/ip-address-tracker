let mymap = L.map('mapid').setView([51.505, -0.09], 13);

function latLng (lat, lng) {
    if (lat && lng) {
        latitude = lat;
        longitude = lng;
    } 
    return
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWF0dGhld3NsYXRlciIsImEiOiJja3NtM3MzOHMxaDRtMm5wY3luejN4ejhpIn0.sPeVUiLJloKA8XSY00R03A'
}).addTo(mymap);

async function getIpData(event) {
    event.preventDefault();
    let ipAddress = $("#searchBox").val();
    let url = `https://geo.ipify.org/api/v1?apiKey=at_QGmz7l5XvYGSgOlxtpjU8VdcZ8IVk&ipAddress=${ipAddress}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    arr =[];
    $("#ip-content").empty();
    $("#location-content").empty();
    $("#timezone-content").empty();
    $("#isp-content").empty();


    $("#ip-content").append(data.ip);
    $("#location-content").append(`${data.location.city}, ${data.location.region} ${data.location.postalCode}`)
    $("#timezone-content").append(`UTC ${data.location.timezone}`)
    $("#isp-content").append(data.isp)

    mymap.setView([data.location.lat, data.location.lng], 13);
    
}

$("form").on("submit", getIpData);