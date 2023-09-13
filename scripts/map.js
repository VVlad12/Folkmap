
let allMarkers = [];

var sock = document.getElementById("additem")
var themeIcon = L.Icon.extend({
    options: {
        //shadowUrl: './img/iconcloth.png',
        iconSize:     [40, 40],
        //shadowSize:   [50, 64],
        iconAnchor:   [20, 20],
        //shadowAnchor: [4, 62],
        popupAnchor:  [0, -20]
    }
});

var danceicon = new themeIcon({iconUrl: './img/icondance.png'}),
	clothicon = new themeIcon({iconUrl: './img/iconcloth.png'}),
	dialecticon = new themeIcon({iconUrl: './img/icondialect.png'});
	musicicon = new themeIcon({iconUrl: './img/iconmusic.png'});
	foodicon = new themeIcon({iconUrl: './img/iconfood.png'});

function addnewitem(){
	let fr = document.forms["additem"];
	console.log(fr)
	txt = 	',\n{'+
					'\n "lat":' + fr["lat"].value +
					',\n "lng":' + fr["lon"].value +
					',\n "name":"' + fr["name"].value +
					'",\n "group":"' + fr["addThemeSelect"].value +
					'",\n "source":"' + fr["sourceSelect"].value +
					'",\n "url":"' + fr["url"].value +
					'",\n "sz":"' + fr["addSize"].value +
					'",\n "marker":{"type":"circle", "color":"red"}'+
				'\n}'

	console.log(txt)

	navigator.clipboard.writeText(txt);
}
document.getElementById("btnsub").addEventListener('click',addnewitem);


// function switchdefaultsize(){

// }
document.getElementById("sourceSelect").addEventListener("change", (e) => {
	let newsz = document.getElementById("addSize")
	switch(e.target.value){
		case "tiktok":
			newsz.value = "v"
		case "youtube":
			newsz.value = "h"
	}

	if (e.target.value=="tiktok"){
		newsz.value = "v"
	} else {
		newsz.value = "h"
	}
	

  });

const map = L.map('map').setView([45.179,  10.701], 3.4);
var layerGroup = L.layerGroup().addTo(map);
// credit 	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'

	const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);


	const popup = L.popup()
		.setLatLng([51.513, -0.09])
		.setContent('I am a standalone popup.')
		.openOn(layerGroup);


		

	
	function addMenu(pos){
		Addmenu = `<div id="divadditemsock">
					<div id="additemsock">
					
					</div>
					</div>
				`
				
		return Addmenu
	}



	



	
	function styleMarker(marker) {
		const { lat, lng, name , group, source,url,sz} = marker;
		var mWidth = 580
		var szHeight = 315
		var szWidth = 560
		//var iframeHTML3 = `<iframe height="600" src="${url}" frameborder="0" ></iframe>`; 
		switch(sz){
			case "v":
				var mWidth = 365
				var szHeight = 600
				var szWidth = 360
			case "h":
				break;
			default: // IF sz is missing (old entry)
				switch(source){
					case "tiktok":
						mWidth = 300
						szHeight = 580
						szWidth = 300
						break;
					case "youtube":
						mWidth = 580
						szHeight = 315
						szWidth = 560
						break;
				}
				break;
		}
		
		switch(source){
			case "tiktok":
				var urltt = "https://www.tiktok.com/embed/v2/"+url
				var iframeHTML3 = `<iframe width="${szWidth}" height="${szHeight}" src="${urltt}" frameborder="0" ></iframe>`;
				// var mWidth = 200; 
				break;
			case "youtube":
				var urlyt = "https://www.youtube.com/embed/"+url
				iframeHTML3 = `<iframe width="${szWidth}" height="${szHeight}" src="${urlyt}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
				// mWidth = 580;
				break;
			default:
				console.log("Type not recognised")
				break;
		}
		//eval(group+"icon")}
		L.marker([lat, lng],{icon:eval(group+"icon")}).addTo(layerGroup).bindPopup(iframeHTML3,{minWidth : mWidth});
	}

	

	function addMarkersToMap(data) {
		if (Array.isArray(data)){
			data.forEach((markerData) => {
				// const { lat, lng, name , source } = markerData;
				// L.marker([lat, lng]).addTo(layerGroup).bindPopup(source);
				styleMarker(markerData)
			});
		} else {
			// const { lat, lng, name , source } = data;
			// L.marker([lat, lng]).addTo(layerGroup).bindPopup(name + source);
			styleMarker(data)
		}
	}

	// Function to add markers to the map
	function initMarkers(data) {
		markers = data;
		addMarkersToMap(data)
	}
	
	


	function handleThemeSelection() {
		const selectElement = document.getElementById('ThemeSelect');
		const selectedgroup = selectElement.value;
		layerGroup.clearLayers();

		if (selectedgroup !== '0') {
			const selectedMarkers = markers.filter(marker => marker.group === selectedgroup);
			if (selectedMarkers.length > 0) {
			  selectedMarkers.forEach(selectedMarker => {
				addMarkersToMap(selectedMarker)
				//map.setView([selectedMarker.lat, selectedMarker.lng], 10);
			  });
			}
		}
		else{
			addMarkersToMap(markers)
		}
	  }

	
	  // Fetch the JSON data and add markers to the map
	fetch('./json/data.json') // Replace 'path/to/your/json/file.json' with the actual path to your JSON file
	.then((response) => response.json())
	.then((data) => initMarkers(data))
	.catch((error) => console.error('Error fetching data:', error));


	

	document.getElementById('ThemeSelect').addEventListener('change', handleThemeSelection);
	

	
  
	

	map.on('click', onMapClick);


	

