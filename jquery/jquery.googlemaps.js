(function($){
	$.fn.googlemaps = function(o){
		if(o.type){
			if(o.type == 'ROADMAP') o.type = google.maps.MapTypeId.ROADMAP;
			if(o.type == 'HYBRID') o.type = google.maps.MapTypeId.HYBRID;
			if(o.type == 'SATELLITE') o.type = google.maps.MapTypeId.SATELLITE;
			if(o.type == 'TERRAIN') o.type = google.maps.MapTypeId.TERRAIN;
		}
		o = $.extend({}, $.googlemaps.defaults, o);
		if($.isArray(o.center)){
			o.center = $.googlemaps.LatLng(o.center);
		}else{
			var results = $.googlemaps.Geocode(o.center);
			o.center = results.geometry.location;
		}
		return this.each(function(){
			$.googlemaps.map = new google.maps.Map(this, o);
			$.googlemaps.Init(o);
		});
	};
	$.googlemaps = {
		// Functions
		Init: function(o){
			//console.log($.googlemaps.map);
			// Set center
			if($.isArray(o.center)){
				$.googlemaps.center = $.googlemaps.LatLng(o.center);
				$.googlemaps.map.setCenter($.googlemaps.center);
			}else if(typeof o.center == 'string'){
				var results = $.googlemaps.Geocode(o.center);
				$.googlemaps.center = results.geometry.location;
				$.googlemaps.map.setCenter($.googlemaps.center);
			}else{
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
			if(o.markers){
				if(!$.isArray(o.markers)){
					o.markers = [o.markers];
				}
				$.googlemaps.Marker(o.markers);
			}
			if(o.polylines){
				if(!$.isArray(o.polylines)){
					o.polylines = [o.polylines];
				}
				$.googlemaps.Polyline(o.polylines);
			}
			if(o.polygons){
				if(!$.isArray(o.polygons)){
					o.polygons = [o.polygons];
				}
				$.googlemaps.Polygon(o.polygons);
			}
			if(o.rectangles){
				if(!$.isArray(o.rectangles)){
					o.rectangles = [o.rectangles];
				}
				$.googlemaps.Rectangle(o.rectangles);
			}
			if(o.circles){
				if(!$.isArray(o.circles)){
					o.circles = [o.circles];
				}
				$.googlemaps.Circle(o.circles);
			}
			if(o.directions){
				$.googlemaps.Directions(o.directions);
			}
		},
		Geocode: function(string){
			$.googlemaps.geocoder = new google.maps.Geocoder();
			$.googlemaps.geocoder.geocode({'address': string}, function(results, status){
				if(status == google.maps.GeocoderStatus.OK){
					return result;
				}else{
					alert("Geocode was not successful for the following reason: " + status);
					return false
				}
			});
		},
		LatLng: function(array){
			return new google.maps.LatLng(array[0], array[1]);
		},
		LatLngBounds: function(array){
			return new google.maps.LatLngBounds(array[0], array[1]);
		},
		Coords: function(data){
			if($.isArray(data)){
				data = $.googlemaps.LatLng(data);
			}else{
				var results = $.googlemaps.Geocode(data);
				data = results.geometry.location;
			}
			return data;
		},
		Marker: function(markers){
			$.each(markers, function(i, marker){
				if($.isArray(marker.position)){
					marker.position = $.googlemaps.LatLng(marker.position);
				}else{
					var results = $.googlemaps.Geocode(marker.position);
					marker.position = results.geometry.location;
				}
				marker.map = $.googlemaps.map;
				var marked = new google.maps.Marker(marker);
				if(marker.info){
					$(marker.info).hide();
					var info = new google.maps.InfoWindow({content: $(marker.info).html()});
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
				$.each(path, function(i, p){
					if($.isArray(p)){
						p = $.googlemaps.LatLng(p);
					}else{
						var results = $.googlemaps.Geocode(p);
						p = results.geometry.location;
					}
				});
				polyline.map = $.googlemaps.map;
				var plotted = new google.maps.Polyline(polyline);
			});
		},
		Polygon: function(polygons){
			$.each(polygons, function(i, polygon){
				// Sort all paths into array of LatLngs
				$.each(paths, function(i, p){
					if($.isArray(p)){
						p = $.googlemaps.LatLng(p);
					}else{
						var results = $.googlemaps.Geocode(p);
						p = results.geometry.location;
					}
				});
				polygon.map = $.googlemaps.map;
				var plotted = new google.maps.Polygon(polygon);
			});
		},
		Rectangle: function(rectangles){
			$.each(rectangles, function(i, rectangle){
				if($.isArray(rectangle.bounds)){
					rectangle.bounds = $.googlemaps.LatLng(rectangle.bounds);
				}else{
					var results = $.googlemaps.Geocode(rectangle.bounds);
					rectangle.bounds = results.geometry.location;
				}
				rectangle.map = $.googlemaps.map;
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
			}
			if(directions.unitSystem == 'IMPERIAL'){
				directions.unitSystem = google.maps.DirectionsUnitSystem.IMPERIAL;
			}else if(directions.unitSystem == 'METRIC'){
				directions.unitSystem = google.maps.DirectionsUnitSystem.METRIC;
			}
			DirectionsDisplay.setMap($.googlemaps.map);
			// Set output panel details
			if(directions.display){
				DirectionsDisplay.setPanel($(directions.display.id));
				$(directions.display.id).hide();
			}
			DirectionsService.route(directions, function(result, status){
				if(status == google.maps.DirectionsStatus.OK){
					DirectionsDisplay.setDirections(response);
					if(directions.display){
						var mapDiv = $.googlemaps.map.getDiv();
						mapDiv.width(function(i, w){
							return (w - directions.display.width);
						});
						$(directions.display.id).show();
					}
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
		geocoder: {}
	};
})(jQuery);