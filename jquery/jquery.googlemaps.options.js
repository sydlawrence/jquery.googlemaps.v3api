// Options object
o = {
	// Default initialisation options.
	center: [52.257347,0.054988], // Array for LatLng, or String for Geocoding
	zoom: 10,
	type: 'ROADMAP', // ROADMAP, HYBRID, SATELLITE, TERRAIN
	// Markers Options
	markers: [
		{
			// Required
			position: [52.257347,0.054988],
			title: '',
			// Optional
			icon: '',
			shadow: '',
			clickable: true,
			dragable: false,
			// Info Window
			info: ''
		}
	],
	// Polyline Options
	polylines: [
		{
			// Required
			path: [
				[52.257347,0.054988],
				[52.257356,0.054988]
			],
			strokeColor: '',
			strokeOpacity: 1,
			strokeWeight: 2,
			// Optional
			clickable: true,
			geodesic: false
		}
	],
	// Polygon Options
	polygons: [
		{
			// Required, must start and end at same coords
			paths: [
				[52.257347,0.054988],
				[52.257356,0.054988],
				[52.258000,0.054988],
				[52.257347,0.054988]
			],
			fillColor: '',
			fillOpacity: 1,
			strokeColor: '',
			strokeOpacity: 1,
			strokeWeight: 2,
			// Optional
			clickable: true,
			geodesic: false
		}
	],
	// Rectangle Options
	rectangles: [
		{
			// Required
			bounds: [
				[52.257347,0.054988],
				[51.257347,0.054666]
			],
			fillColor: '',
			fillOpacity: 1,
			strokeColor: '',
			strokeOpacity: 1,
			strokeWeight: 2,
			// Optional
			clickable: true
		}
	],
	// Circle Options
	circles: [
		{
			// Required
			center: [52.257347,0.054988],
			raduis: 5, // meters
			fillColor: '',
			fillOpacity: 1,
			strokeColor: '',
			strokeOpacity 1,
			strokeWeight: 2,
			// Optional
			clickable: true,
			geodesic: false
		}
	],
	// Layer Overlays
	layers: [
		{
			type: '', // bicycling, traffic, fusion, kml
			// Fusion Options
			query: '',
			heatmap: false,
			// KML Options
			url: '',
			// Fusion & KML Options
			clickable: true
		}
	],
	// Streetview Panoramas
	streetview: {
		// Required
		id: '', // ID of the div to caontain the streetview
		position: [52.257347,0.054988],
		// Optional
		pov: {
			heading: 34,
			pitch: 10,
			zoom: 1
		}
	},
	// Directions Overlay
	directions: {
		// Required
		origin: [52.257347,0.054988], // Array for LatLng or String for Geocoding
		destination: [52.257356,0.054988], // Array for LatLng or String for Geocoding
		display: '', // ID of div to contain results
		// Optional
		waypoints: [
			{
				location: [52.257356,0.054988], // Array for LatLng or string for Geocoding
				stopover: false
			}
		],
		travelMode: 'DRIVING', // DRIVING, BICYCLING, WALKING
		unitSystem: 'IMPERIAL', // IMPERIAL, METRIC
		showMarkers: false
	}
};