
//////////Implement map//////
var mymap = L.map('mapid').setView([-25.75395, 28.23053], 17);

//Code for baselayers
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(mymap);
var OpenStreetMap =	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', 
});
//OpenStreetMap.addTo(mymap);
var basemaps={
	"Street Map": OpenStreetMap,
	"Satellite Imagery": googleSat
};

//Code for the WFS layer
var owsrootUrl = 'http://41.185.27.219:8080/geoserver/Devgroup3/ows';
var defaultParameters = {
    service : 'WFS',
    version : '2.0',
    request : 'GetFeature',
    typeName : 'Devgroup3:incident',
    outputFormat : 'text/javascript',
    format_options : 'callback:getJson',
    SrsName : 'EPSG:4326'
};
/*
var geojsonMarkerOptions = {
    radius: feature.properties.accuracy,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};*/
var statID;
var myZoom = {
  start:  mymap.getZoom(),
  end: mymap.getZoom()
};
var actStatus;
var lastID;
var coordinates;
var maxID;
var ID_arr=[];
var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);
var WFSLayer = null;
function onLoadd(){
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'getJson',
    success : function (response) {
        WFSLayer = L.geoJson(response, {
			
			pointToLayer: function (feature, latlng) {
			
			coordinates=latlng;
			lastID=feature.id;
			lastID=parseInt(lastID.substring(9));
			ID_arr.push(lastID);
			var maxID = Math.max(...IDarr);
			console.log('log '+ ID_arr+' max '+ maxID);
			switch (feature.properties.status) {
            case 'Unattended': return L.circleMarker(latlng, {radius: 8,
				fillColor: "#900C3F",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8,});
			case 'attended': return L.circleMarker(latlng, {radius: 8,
				fillColor: "#410C90",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8,});
			case 'inProgress': return L.circleMarker(latlng, {radius: 8,
				fillColor: "#238835",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8,});		 
    }	 
	},
            onEachFeature: function (feature, layer) {
                popupOptions = {maxWidth: 200};
                layer.bindPopup("Status: " + feature.properties.status + "<br>Time: " + feature.properties.time + "<br>Type: " + feature.properties.type,popupOptions);
            }
        })
		.on('click', function(e){		
			actStatus = e.layer.feature.properties;
			statID=e.layer.feature.id;
			statID=parseInt(statID.substring(9));
			console.log('actStatus: '+ statID);
		}).addTo(mymap);
    }
});
}
//////////add layer control///////////
L.control.layers(basemaps).addTo(mymap);
/*mymap.on('zoomstart', function(e) {
		   myZoom.start = mymap.getZoom();
		}).on('zoomend', function(e) {
			myZoom.end = mymap.getZoom();
			console.log(e.zoom+'e');
			var diff = myZoom.start - myZoom.end;
			if (diff > 0) {
				WFSLayer.onEachFeature: function{}
				WFSLayer._layers.options.setRadius(WFSLayer_layers.options.getRadius() / 2);
			} else if (diff < 0) {
				WFSLayer._layers.feature.setRadius(WFSLayer_layers.feature.getRadius() / 2);
				
			}
		});*/
/////////locate user///////////
var userLat, userLong;
 mymap.locate({setView: true, watch: false})
	.on('locationfound', function(e){
		console.log("found");
		userLat=e.latitude;
		userLong=e.longitude;
		mymap.setView([userLat, userLong], 15);
		var circle = L.circle([userLat, userLong], e.accuracy/2,{
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.4
            });
			mymap.addLayer(circle);
	})
	
////////////change properties///////////

var stat;
function changeP (id){
	console.log('id '+ id);
	if(actStatus.status == 'inProgress'){
		console.log(actStatus.status);
		actStatus.status = 'attended';
		stat=actStatus.status;
		onLoadd();
	}
	if(actStatus.status == 'Unattended'){
		console.log(actStatus.status);
		actStatus.status = 'inProgress';
		stat=actStatus.status;
		onLoadd();
	}
	console.log('after if: '+ actStatus.status);
	updStatus();
	
}

function updStatus(){
		$.ajax({
		type: "POST",
		url: "updateStatus.php",
		data:{stat:stat, statID:statID},
		}).done(function( msg ) {
		alert( "sent" + actStatus.status + statID );
		});    
	};