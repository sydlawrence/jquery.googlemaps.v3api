# Google Maps API v3 for jQuery

This is currently a very simple implementation of the API in jQuery. It will
enable developers to easily call Google Maps using easy jQuery methods that
we're all used to.

##Current status:

* Maps:			Done, tested LatLng.
* Markers:		Done, tested LatLng.
* InfoWindows:	Done, tested LatLng.
* Polylines:	Done, tested LatLng.
* Polygons:		Done, tested LatLng.
* Rectangles:	Done, broken, problems with LatLngBounds - needs more research
* Circles:		Done, untested
* Layers:		Done, except fusion, untested
* Streetview:	Done, untested
* Directions:	Done, tested.

##Issues so far:

* Geocoding seems to refuse to pass the results object outside of the callback
  function. Am I missing something??
* Need to sort out the LatLngBounds function, is returning correct data, yet
  Rectangle just **will not** receive it! Keeps saying wrong data type?

##Refactor/Todo's:

* Directions: Show markers? Should I, as each returned result is clickable and
  will display InfoWindow on the map?
* Directions: Add waypoints? This will take some time.
* Add support for more advanced options.
* Document each function in code. - In progress...
* Document and example the abilities.