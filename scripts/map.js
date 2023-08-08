
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
					'",\n "marker":{"type":"circle", "color":"red"}'+
				'\n }'

	console.log(txt)

	navigator.clipboard.writeText(txt);
}
document.getElementById("btnsub").addEventListener('click',addnewitem);


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


		

	
	function addMenu(pos){
		Addmenu = `
					<div id="additemsock">
					
				</div>


				`

				// <form id="additem" >
				// 	<label for="lat">Lat</label>
				// 			<input type="text" name="lat" id="lat" value="${pos["lat"]}"/>
				// 			<label for="lon">Lon</label>
				// 			<input type="text"  name="lon" id="lon" value="${pos["lng"]}" />
				// 			<label for="name">Name</label>
				// 			<input type="text" name="name" id="name" />
				// 			<label for="url">Url</label>
				// 			<input type="text" name="url" id="url" />

							
				// 			<select id="sourceSelect">
				// 				<option value="youtube">youtube</option>
				// 				<option value="tiktok">tiktok</option>
				// 			</select>

							
				// 			<select id="addThemeSelect" name="addThemeSelect">
				// 				<option value="cloth">cloth</option>
				// 				<option value="dance">dance</option>
				// 				<option value="dialect">dialect</option>
				// 			</select>
					
				// 	<input type="button" id="btnsub" value="Submit">
				// 	</form>

				//<form id="additem" >
				// <label for="lat">Lat</label>
				// 		<input type="text" name="lat" id="lat" value="${pos["lat"]}"/>
				// 		<label for="lon">Lon</label>
				// 		<input type="text"  name="lon" id="lon" value="${pos["lng"]}" />
				// 		<label for="name">Name</label>
				// 		<input type="text" name="name" id="name" />
				// 		<label for="url">Url</label>
				// 		<input type="text" name="url" id="url" />

						
				// 		<select id="sourceSelect">
				// 			<option value="youtube">youtube</option>
				// 			<option value="tiktok">tiktok</option>
				// 		</select>

						
				// 		<select id="addThemeSelect" name="addThemeSelect">
				// 			<option value="cloth">cloth</option>
				// 			<option value="dance">dance</option>
				// 			<option value="dialect">dialect</option>
				// 		</select>
				// <form action="/action_page.php">
				// <p><label for="w3review">Review of W3Schools:</label></p>
				// <textarea id="w3review" name="w3review" rows="4" cols="50">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.</textarea>
				// <br>
				// <input type="submit" value="Submit">
				// </form>
				
		return Addmenu
	}

	function onMapClick(e) {
		if(True){
			return null
		}
		popup
			.setLatLng(e.latlng)
			//.setContent(`You clicked the map at ${e.latlng.toString()}`)
			.setContent(addMenu(e.latlng))
			.openOn(map);
		var pos = e.latlng
		
		document.getElementById("additemsock").append(sock)
		document.getElementById("lat").value = pos["lat"]
		document.getElementById("lon").value = pos["lng"]
	}

	



	
	function styleMarker(marker) {
		const { lat, lng, name , group, source,url} = marker;
		
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


	

