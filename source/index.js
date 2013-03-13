$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 90; // Calculate the top offset

  $('#map_canvas').css('height', (h - offsetTop));
}).resize();

$(function() {

  MapsLib.initialize();
  $("#search_address").geocomplete();

  $(':checkbox').click(function(){
    MapsLib.doSearch();
  });

  $(':radio').click(function(){
    MapsLib.doSearch();
  });
  
  $('#search_radius').change(function(){
    MapsLib.doSearch();
  });
  
  $('#search').click(function(){
    MapsLib.doSearch();
  });
  
  $('#find_me').click(function(){
    MapsLib.findMe(); 
    return false;
  });
  
  $('#reset').click(function(){
    $.address.parameter('address','');
    MapsLib.initialize(); 
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