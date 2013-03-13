$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 90; // Calculate the top offset

  $('#map_canvas').css('height', (h - offsetTop));
}).resize();

$(function() {
  
  var allData

  MapsLib.initialize();
  
  // fetch directly from fusion tables
  // fetchFusionTablesData(MapsLib.fusionTableId, function(err, data) {
  //   showOnMap(map, data.venues)
  // })
  
  // fetch from a json file
  fetchJSON('data.json', function(err, data) {
    if (err) return alert(JSON.stringify(err))
    allData = data
    showOnMap(map, data)
  })
  
  $("#search_address").geocomplete();

  $(':checkbox').click(function(e){
    var filters = getAllChecked()
    var filtered = filter(allData, buildConditions(filters))
    showOnMap(map, filtered)
  });
  
  $('#search').click(function(){
    MapsLib.doSearch();
  });
  
  $('#find_me').click(function(){
    MapsLib.findMe(); 
    return false;
  });
  
  $(":text").keydown(function(e){
      var key =  e.keyCode ? e.keyCode : e.which;
      if(key == 13) {
          $('#search').click();
          return false;
      }
  });
});