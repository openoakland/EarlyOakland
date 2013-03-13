$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 90; // Calculate the top offset

  $('#map_canvas').css('height', (h - offsetTop));
}).resize();

$(function() {

  MapsLib.initialize();
  fetchAllData(MapsLib.fusionTableId, function(err, data) {
    showOnMap(map, data.venues)
  })
  $("#search_address").geocomplete();

  $(':checkbox').click(function(){

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