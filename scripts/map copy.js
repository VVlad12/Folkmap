var lat = 48.852969;
var lon = 2.349903;
var macarte = null;
var points = [{
    "latitud": 51.479245, 
    "longitud": -0.19819,
}, {
    "latitud": 51.479245,
    "longitud": -0.09819,
},
// 
// More Lat-Lng Points
// 
{
    "latitud": 51.479245,
    "longitud": -0.00819,
}];

// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: '',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    var marker1 = L.marker([lat, lon]).addTo(macarte);
    var marker2 = L.marker([51.5, -0.09]).addTo(map);
    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
        }).addTo(map);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
        ]).addTo(map);

    marker1.bindPopup("<b>Hello world!</b><br>I am a 1 popup.").openPopup();
    marker2.bindPopup("<b>Hello world!</b><br>I am a  2 popup.").openPopup();

   
    for (var i in points) {
        var latlng = [points[i].latitud,  points[i].longitud];

        L.marker( latlng ).addTo(map);
    }
}
window.onload = function(){
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
initMap(); 
};

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
}

// Function to add markers to the map
function addMarkersToMap(data) {
    data.forEach((markerData) => {
      const { lat, lng, name } = markerData;
      L.marker([lat, lng]).addTo(map).bindPopup(name);
    });
  }
  
  // Fetch the JSON data and add markers to the map
fetch('/json/data.json') // Replace 'path/to/your/json/file.json' with the actual path to your JSON file
    .then((response) => response.json())
    .then((data) => addMarkersToMap(data))
    .catch((error) => console.error('Error fetching data:', error));

map.on('click', onMapClick);