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
		InfoWindow: function(marker, info){
			var info = new google.maps.InfoWindow();
		},
		// Objects and Params
		defaults: {
			center: [52.257347,0.054988],
			zoom: 10,
			type: google.maps.MapTypeId.ROADMAP
		},
		center: {},
		geocoder: {},
		
	};
})(jQuery);