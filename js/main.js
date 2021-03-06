

// Searchbar Handler

$(function(){

  var searchField = $('#query');
  var icon = $('#search-btn');
  
  // Focus Event Handler
  $(searchField).on('focus', function(){
    $(icon).animate({ right:'7px'}, 150);
    $(this).animate({ width:'100%'}, 400);
  });
  
  // Blur Event Handler
  $(searchField).on('blur', function(){
    if(searchField.val() == '') {
      $(searchField).animate({ width:'70%'},400, function(){});
      $(icon).animate({right:'16%'}, 50, function(){});
    }
  });

  $('#search-form').submit(function(e){
    e.preventDefault();
    $('body').css({ background: 'none'});
    $('.banner').animate({ padding: '50px 0 0 0'}, 400);
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
      maxResults: 4,
      channelId: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
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

        var buttons = getButtons(prevPageToken, nextPageToken);
        
        // Display buttons
        $('#buttons').append(buttons);
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
  var output = '<li>' +
  '<div class="list-left"><a class="fancybox fancybox.iframe" href="https://www.youtube.com/embed/'+videoId+'">' +
  '<img src="'+thumb+'"></a>' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class="fancybox fancybox.iframe" href="https://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';
  
  return output;
}

// Next page function

function nextPage() {
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
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
      maxResults: 4,
      channelId: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
      pageToken: token,
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

        var buttons = getButtons(prevPageToken, nextPageToken);
        
        // Display buttons
        $('#buttons').append(buttons);
      }
  );

}


// Prev page function 
function prevPage() {
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');
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
      maxResults: 4,
      channelId: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
      pageToken: token,
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

        var buttons = getButtons(prevPageToken, nextPageToken);
        
        // Display buttons
        $('#buttons').append(buttons);
      }
  );

}


// Build the buttons

function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">'+
    '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
    'onclick="prevPage();">Prev Page</button>' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick="nextPage();">Next Page</button></div>';
  }
  return btnoutput;
}
