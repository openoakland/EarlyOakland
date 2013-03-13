function fetchAllData(callback) {
  $.ajax({
    dataType: 'jsonp',
    url: 'https://fusiontables.googleusercontent.com/fusiontables/api/query?sql=SELECT+*+FROM+1D7Lta4QnerWlTClAiWoQsaWZksDcycqc0Up0QPI&jsonCallback=?',
    success: function(data) {
      callback(false, formatData(data))
    },
    error: function(err) {
      callback(err)
    }
  })
  
}

// accepts data from fusion tables JSON API
function formatData(data) {
  var cleaned = []
  data.table.rows.forEach(function(row) {
    var cleanRow = {}
    for (var i = 0; i < row.length - 1; i++) {
      cleanRow[data.table.cols[i]] = row[i]
    }
    cleaned.push(cleanRow)
  })
  return cleaned
}