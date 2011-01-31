/**
 * Google Maps API v3
 * A jQuery wrapper function for the new API
 */
(function($){
	$.fn.googlemaps = function(o){
		// Set the MapTypeId before anything else
		if(o.type){
			if(o.type == 'ROADMAP') o.type = google.maps.MapTypeId.ROADMAP;
			if(o.type == 'HYBRID') o.type = google.maps.MapTypeId.HYBRID;
			if(o.type == 'SATELLITE') o.type = google.maps.MapTypeId.SATELLITE;
			if(o.type == 'TERRAIN') o.type = google.maps.MapTypeId.TERRAIN;
		}
		// Extend the options with the defaults
		o = $.extend({}, $.googlemaps.defaults, o);
		// Geocode/LatLng the center
		if($.isArray(o.center)){
			o.center = $.googlemaps.Coords(o.center);
		}else{
			var results = $.googlemaps.Geocode(o.center);
			o.center = results.geometry.location;
		}
		// Initiate a Google Map for each element passed
		return this.each(function(){
			$.googlemaps.map = new google.maps.Map(this, o);
			// Initialize any other options into the map
			$.googlemaps.Init(o);
		});
	};
	$.googlemaps = {
		/**
		 * Functions are denoted by a Capital first letter
		 * storage objects, arrays etc are lower case
		 */
		/**
		 * Init
		 *
		 * Function to initialise any extra options that have been supplied
		 * @param o {object} The options object. Contains objects, arrays,
		 *   strings and integers
		 */
		Init: function(o){
			// Set center
			if(o.center){
				$.googlemaps.center = o.center;
				$.googlemaps.map.setCenter($.googlemaps.center);
			}
			// Set zoom
			if(o.zoom){
				$.googlemaps.map.setZoom(o.zoom);
			}
			// Set Map Type
			if(o.type){
				$.googlemaps.map.setMapTypeId(o.type);
			}
			// Set any Markers
			if(o.markers){
				if(!$.isArray(o.markers)){
					o.markers = [o.markers];
				}
				$.googlemaps.Marker(o.markers);
			}
			// Plot any Polylines
			if(o.polylines){
				if(!$.isArray(o.polylines)){
					o.polylines = [o.polylines];
				}
				$.googlemaps.Polyline(o.polylines);
			}
			// Plot any Polygons
			if(o.polygons){
				if(!$.isArray(o.polygons)){
					o.polygons = [o.polygons];
				}
				$.googlemaps.Polygon(o.polygons);
			}
			// Plot any Rectangles
			if(o.rectangles){
				if(!$.isArray(o.rectangles)){
					o.rectangles = [o.rectangles];
				}
				$.googlemaps.Rectangle(o.rectangles);
			}
			// Plot any Circles
			if(o.circles){
				if(!$.isArray(o.circles)){
					o.circles = [o.circles];
				}
				$.googlemaps.Circle(o.circles);
			}
			// Plot any Layers
			if(o.layers){
				if(!$.isArray(o.layers)){
					o.layers = [o.layers]
				}
				$.googlemaps.Layer(o.layers);
			}
			// Plot any Directions
			if(o.directions){
				$.googlemaps.Directions(o.directions);
			}
		},
		Geocode: function(string){
			$.googlemaps.geocoder = new google.maps.Geocoder();
			var output;
			$.googlemaps.geocoder.geocode({address: string}, function(results, status){
				if(status == google.maps.GeocoderStatus.OK){
					output = results;
				}else{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		},
		/**
		 * @param array {array} Array of one set of coords
		 */
		LatLng: function(array){
			return new google.maps.LatLng(array[0], array[1]);
		},
		/**
		 * @param array {array} Array of two sets of coords, stored in arrays
		 */
		LatLngBounds: function(array){
			array[0] = $.googlemaps.LatLng(array[0]);
			array[1] = $.googlemaps.LatLng(array[1]);
			return new google.maps.LatLngBounds(array[0], array[1]);
		},
		/**
		 * $.googlemaps.Coords
		 * 
		 * @param data {array} Array of coords
		 * @param data {string} Address as string
		 *
		 * @returns {object} Google LatLng object
		 */
		Coords: function(data){
			if($.isArray(data)){
				data = $.googlemaps.LatLng(data);
			}else if(typeof o.center == 'string'){
				var results = $.googlemaps.Geocode(data);
				data = results.geometry.location;
			}else{
				data = o.center;
			}
			return data;
		},
		/**
		 * @param markers {array} Array of objects containing Marker parameters
		 */
		Marker: function(markers){
			$.each(markers, function(i, marker){
				if($.isArray(marker.position)){
					marker.position = $.googlemaps.LatLng(marker.position);
				}else{
					console.log(marker);
					var results = $.googlemaps.Geocode(marker.position);
					marker.position = results.geometry.location;
				}
				marker.map = $.googlemaps.map;
				var marked = new google.maps.Marker(marker);
				if(marker.info){
					if((marker.info).match('^#')){
						$(marker.info).hide();
						var info = new google.maps.InfoWindow({content: $(marker.info).html()});
					}else{
						var info = new google.maps.InfoWindow({content: marker.info});
					}
					var oldcenter = $.googlemaps.map.getCenter();
					google.maps.event.addListener(marked, 'click', function(){
						info.open($.googlemaps.map, marked);
					});
					google.maps.event.addListener(info, 'closeclick', function(){
						$.googlemaps.map.panTo(oldcenter);
					});
				}
			});
		},
		Polyline: function(polylines){
			$.each(polylines, function(i, polyline){
				// Sort all paths into array of LatLngs
				$.each(polyline.path, function(i, path){
					if($.isArray(path)){
						polyline.path[i] = $.googlemaps.LatLng(path);
					}else{
						var results = $.googlemaps.Geocode(path);
						polyline.path[i] = results.geometry.location;
					}
				});
				polyline.map = $.googlemaps.map;
				var plotted = new google.maps.Polyline(polyline);
			});
		},
		Polygon: function(polygons){
			$.each(polygons, function(i, polygon){
				// Sort all paths into array of LatLngs
				$.each(polygon.paths, function(i, path){
					if($.isArray(path)){
						polygon.paths[i] = $.googlemaps.LatLng(path);
					}else{
						var results = $.googlemaps.Geocode(path);
						polygon.paths[i] = results.geometry.location;
					}
				});
				polygon.map = $.googlemaps.map;
				var plotted = new google.maps.Polygon(polygon);
			});
		},
		Rectangle: function(rectangles){
			$.each(rectangles, function(i, rectangle){
				rectangles.bounds = $.googlemaps.LatLngBounds(rectangle.bounds);
				rectangles.map = $.googlemaps.map;
				plotted = new google.maps.Rectangle(rectangle);
			});
		},
		Circle: function(circles){
			$.each(circles, function(i, circle){
				if($.isArray(circle.center)){
					circle.center = $.googlemaps.LatLng(circle.center);
				}else{
					var results = $.googlemaps.Geocode(circle.center);
					circle.center = results.geometry.location;
				}
				circle.map = $.googlemaps.map;
				plotted = new google.maps.Circle(circle);
			});
		},
		Layer: function(layers){
			$.each(layers, function(i, layer){
				layer.map = $.googlemaps.map;
				if(layers.type == 'bicycling'){
					var layer = new google.maps.BicyclingLayer();
					layer.setMap(layer.map);
				}else if(layers.type == 'traffic'){
					var layer = new google.maps.TrafficLayer();
					layer.setMap(layer.map);
				}else if(layers.type == 'fusion'){
					// Not implemented yet!
				}else if(layers.type == 'kml'){
					kml = new google.maps.KmlLayer(layers.url, layers);
				}
			});
		},
		Streetview: function(streetview){
			pano = new google.maps.StreetViewPanorama($(streetview.id), streetview);
			$.googlemaps.map.setStreetView(pano);
		},
		Directions: function(directions){
			var DirectionsService= new google.maps.DirectionsService();
			var DirectionsDisplay = new google.maps.DirectionsRenderer();
			
			// Set modes and Units
			if(directions.travelMode == 'DRIVING'){
				directions.travelMode = google.maps.DirectionsTravelMode.DRIVING;
			}else if(directions.travelMode == 'BICYCLING'){
				directions.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
			}else if(directions.travelMode == 'WALKING'){
				directions.travelMode = google.maps.DirectionsTravelMode.WALKING;
			}else{
				directions.travelMode = google.maps.DirectionsTravelMode.DRIVING;
			}
			
			if(directions.unitSystem == 'IMPERIAL'){
				directions.unitSystem = google.maps.DirectionsUnitSystem.IMPERIAL;
			}else if(directions.unitSystem == 'METRIC'){
				directions.unitSystem = google.maps.DirectionsUnitSystem.METRIC;
			}else{
				directions.unitSystem = google.maps.DirectionsUnitSystem.IMPERIAL;
			}
			
			DirectionsDisplay.setMap($.googlemaps.map);
			
			// Set output panel details
			if(directions.display){
				DirectionsDisplay.setPanel($(directions.display)[0]);
			}
			//$.googlemaps.Geocode(directions.origin);
			//console.log($.googlemaps.results);
			//directions.origin = $.googlemaps.results.geometry.location;
			
			directions.destination = $.googlemaps.Coords(directions.destination);
			
			var route = {
				origin: directions.origin,
				destination: directions.destination,
				travelMode: directions.travelMode,
				unitSystem: directions.unitSystem
			}
			DirectionsService.route(route, function(response, status){
				if(status == google.maps.DirectionsStatus.OK){
					DirectionsDisplay.setDirections(response);
				}
			});
		},
		// Objects and Params
		defaults: {
			center: [52.257347,0.054988],
			zoom: 10,
			type: google.maps.MapTypeId.ROADMAP
		},
		center: {},
		geocoder: {},
		results: {}
	};
})(jQuery);