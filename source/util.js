(function(exports) {
  var mapMarkers = []

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
  
  exports.showOnMap = function(map, objects) {
    mapMarkers.forEach(function(marker) { marker.setMap(null) })
    mapMarkers = objects.map(function(obj) {
      var pos = new google.maps.LatLng(obj.lat, obj.lon)
      var marker = new google.maps.Marker({map: map, position: pos})
      marker.setVisible(true)
      google.maps.event.addListener(marker, 'click', function() {
        var html = '<dl>'
        Object.keys(obj).map(function(key) {
          if (key === 'lat' || key === 'lon') return
          html += '<dt>' + key + '</dt> <dd>' + obj[key] + '</dd>'
        })
        html += '</dl>'
        var infoWindow = new google.maps.InfoWindow()
        infoWindow.setContent(html)
        infoWindow.open(map, marker)
      })
      return marker
    })
  }
  
  exports.filter = function(objects, conditions) {
    var results = []
    conditions.map(function(condition) {
      objects.map(function(obj) {
        if (condition(object)) results.push(obj)
      })
    })
    return _.uniq(results)
  }

})(window)
