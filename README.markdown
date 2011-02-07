# Google Maps API v3 for jQuery

This is currently a very simple implementation of the API in jQuery. It will
enable developers to easily call Google Maps using easy jQuery methods that
we're all used to.

##Current status:

* Maps:			Done, tested LatLng, untested Geocode.
* Markers:		Done, tested LatLng, untested Geocode.
* MarkerImage:	Done, untested.
* InfoWindows:	Done, tested.
* Polylines:	Done, tested LatLng, untested Geocode.
* Polygons:		Done, tested LatLng, untested Geocode.
* Rectangles:	Done, broken, problems with LatLngBounds - needs more research
* Circles:		Done, untested
* Layers:		Done, except fusion, untested
* Streetview:	Done, untested
* Directions:	Done, tested LatLng, untested Geocode.

##Issues so far:

* Geocoding: Need to rip this apart as it's asynchronous.
* Need to sort out the LatLngBounds function, is returning correct data, yet
  Rectangle just **will not** receive it! Keeps saying wrong data type?

##Refactor/Todo's:

* Directions: Show markers? Should I, as each returned result is clickable and
  will display InfoWindow on the map?
* Directions: Add waypoints? This will take some time.
* Add support for more advanced options.
* Document each function in code. - In progress...
* Document and example the abilities.