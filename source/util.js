(function(exports) {
  var mapMarkers = []

 //counting markers
  var resultCount = 0

  exports.fetchFusionTablesData = function(fusionTablesID, callback) {
    $.ajax({
      dataType: 'jsonp',
      url: 'https://fusiontables.googleusercontent.com/fusiontables/api/query?sql=SELECT+*+FROM+' + fusionTablesID + '&jsonCallback=?',
      success: function(data) {
        callback(false, exports.formatData(data))
      },
      error: function(err) {
        callback(err)
      }
    })
  }

  exports.fetchJSON = function(url, cb) {
    $.ajax({
      dataType: 'json',
      url: url,
      success: function(data) {
        cb(false, eval(data))
      },
      error: function(xhr, status, err) {
        cb(err)
      }
    })
  }

  // accepts data from fusion tables JSON API
  exports.formatData = function(data) {
    var cleaned = []
    data.table.rows.forEach(function(row) {
      var cleanRow = {}
      for (var i = 0; i < row.length - 1; i++) {
        cleanRow[data.table.cols[i]] = row[i]
      }
      cleaned.push(cleanRow)
    })
    return { venues: cleaned }
  }

  exports.showOnMap = function( map, objects ) {
    var filter,
        template,
        filterKey,
        filterType = {};

    mapMarkers.forEach(function( marker ) { if ( marker ) marker.setMap( null ); });
    mapMarkers = objects.map(function( obj ) {
        var pos,
            marker;

      if ( !obj.location ) return;

      pos = new google.maps.LatLng( obj.location.lat, obj.location.lng );
      marker = new google.maps.Marker( {map: map, position: pos} );
      marker.setVisible( true );

      google.maps.event.addListener(map, 'click', function() {
        closeInfoWindow();
        });

      google.maps.event.addListener(marker, 'click', function() {

        if ( isInfoWindowOpen() ) closeInfoWindow();

        Object.keys( obj ).map(function( key ) {
            filter = {};
            filterKey = key.replace( /[^A-Z0-9]/ig, "_" );
            filterKey = filterKey.toLowerCase();

            filter.name = key;
            filter.value = obj[ key ];

            if ( obj[key] ) filterType[ filterKey ] = filter;
        });

        template = _.template($('.info-window-content-template').html());
        template = template( filterType );

        exports.infoWindow = new google.maps.InfoWindow();
        exports.infoWindow.setContent(template);
        exports.infoWindow.open(map, marker);
      });

      return marker;
    });
  };

  exports.isInfoWindowOpen = function() {
    if ( typeof infoWindow === 'undefined' ) return false;
    return ( infoWindow.getMap() !== 'null' );
  };

  exports.closeInfoWindow = function() {
    if ( typeof infoWindow === 'undefined' ) return;
    infoWindow.close();
  };

  exports.filter = function(objects, conditions) {
    var results = []
    conditions.map(function(condition) {
      objects.map(function(obj) {
        if (condition(obj)) results.push(obj)
      })
    })
    return _.uniq(results)
  }

  exports.getAllChecked = function () {
    var filters = []
    $('input:checkbox:checked').map(function(i, input) {
      var entry = $(input).parent()
      var tuple = [entry.attr('data-key'), entry.attr('data-value')]
      filters.push(tuple)
    })
    return filters
  }

  exports.buildConditions = function(filters) {
    var conditions = []
    filters.forEach(function(filter) {
      var condition = function(obj) {
        console.log(obj, filter)
        return obj[filter[0]] === filter[1]
      }
      conditions.push(condition)
    })
    return conditions
  }
  exports.createResultsList = function (obj){
     //create results list embed in marker loop for closure
   }
})(window)
