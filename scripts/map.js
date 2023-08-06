
let allMarkers = [];


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



const map = L.map('map').setView([45.179,  10.701], 3.4);
var layerGroup = L.layerGroup().addTo(map);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);


	const popup = L.popup()
		.setLatLng([51.513, -0.09])
		.setContent('I am a standalone popup.')
		.openOn(layerGroup);

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent(`You clicked the map at ${e.latlng.toString()}`)
			.openOn(map);
	}



	
	function styleMarker(marker) {
		const { lat, lng, name , group, source,url} = marker;
		
		console.log(url);
		//var iframeHTML3 = `<iframe height="600" src="${url}" frameborder="0" ></iframe>`; 
		switch(source){
			case "tiktok":
				var urltt = "https://www.tiktok.com/embed/v2/"+url
				var iframeHTML3 = `<iframe height="600" src="${urltt}" frameborder="0" ></iframe>`;
				var mWidth = 200; 
				break;
			case "youtube":
				var urlyt = "https://www.youtube.com/embed/"+url
				iframeHTML3 = `<iframe width="560" height="315" src="${urlyt}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
				mWidth = 580;
				break;
			default:
				console.log("Type not recognised")
				break;
		}
		console.log("Styling marker")
		console.log(group+"icon")
		//eval(group+"icon")}
		L.marker([lat, lng],{icon:eval(group+"icon")}).addTo(layerGroup).bindPopup(iframeHTML3,{minWidth : mWidth});
	}

	

	function addMarkersToMap(data) {
		console.log(data)
		if (Array.isArray(data)){
			console.log("Array")
			data.forEach((markerData) => {
				console.log(markerData)
				// const { lat, lng, name , source } = markerData;
				// L.marker([lat, lng]).addTo(layerGroup).bindPopup(source);
				styleMarker(markerData)
			});
		} else {
			console.log("else")
			// const { lat, lng, name , source } = data;
			// L.marker([lat, lng]).addTo(layerGroup).bindPopup(name + source);
			styleMarker(data)
		}
	}

	// Function to add markers to the map
	function initMarkers(data) {
		markers = data;
		console.log("Init data")
		console.log(data)
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
				console.log(selectedMarker)
				addMarkersToMap(selectedMarker)
				//map.setView([selectedMarker.lat, selectedMarker.lng], 10);
			  });
			}
		}
		else{
			console.log("All")
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

