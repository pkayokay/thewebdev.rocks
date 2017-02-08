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
})


function search(){
  // Clear Results
  $('#results').html('');
  $('#buttons').html('');
  
  // Get Form Input
  q = $('#query').val();
  
  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type:'video',
      key: 'AIzaSyA8050EV9ucpro6oNMHo3AFm8d1IjUIoJc'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        
        // Log Data
        console.log(data);
        
        $.each(data.items, function(i, item){
          // Get Output
          var output = getOutput(item);
          
          // Display Results
          $('#results').append(output);
        });
      }
  );
}

// Build Output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;
  
  // Build Output String
  var output = 
  '<div class="list">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list">' +
  '<h3>'+title+'</h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'
  +
  '</div>' +
  '<div class="clearfix"></div>' +
  '';
  
  return output;
}