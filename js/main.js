// Searchbar Handler
$(function(){
  var searchField = $('#query');
  var icon = $('#search-btn');
  
  // Focus Event Handler
  $(searchField).on('focus', function(){
    $(icon).animate({
      right:'7px'
    }, 150);
    $(this).animate({
      width:'100%'
    }, 400);
  });
  
  // Blur Event Handler
  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width:'75%'
      },400, function(){});
      $(icon).animate({
        right:'16%'
      }, 50, function(){});
    }
  });
  

  $('#search-form').submit(function(e){
    e.preventDefault();
  });
});