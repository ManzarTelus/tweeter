/*
 * Client-side JS
 * jQuery is already loaded
  */

$(document).ready(function() {
  //Create the tweet HTML
  const createTweetElement = function(tweet) {
    tweet.content.text = $("<div>").text(tweet.content.text).html();
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="name-avatar">         
            <img name=avatarPic src=${tweet.user.avatars}>
            <div class="client-name" name="name">${tweet.user.name}</div>
          </div>
          <div class="handle" name="handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-text" name="tweetText">${tweet.content.text}</div> 
      <footer>
          <div>${timeago.format(tweet.created_at)}</div>        
        <div class="image-class">
        <i class="fa-solid fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
    </article>)
    `);
    return $tweet;
  };
  
  //loops through the tweets and dynamically render each
  const renderTweets = function(tweets) {
    $('.tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    }
  };

  $('#form').submit(function(event) {
    event.preventDefault();
    $('#error-print').slideUp(400).empty();
    const text = $("#tweet-text").val();
    const data = $(this).serialize();
    if (!text) {
      $('#error-print').empty();
      const $errorMessage ="⚠  Please write TWEET before submission. ⚠ ";
      $('#error-print').text($errorMessage).slideDown();
      $('#error-print').css('border-style', 'solid' );
      $('#error-print').css('color', 'red' );
      return;
    }
    else if (text.length > 140) {
      const $errorMessage = "⚠ Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye. ⚠";
      $('#error-print').text($errorMessage).slideDown();
      $('#error-print').css('border-style', 'solid');
      $('#error-print').css('color', 'red' );
      return;
    }
    $("#form")[0].reset();
    $.ajax({    
      method: 'post',
      url : '/tweets',
      data
    }).then(loadTweets);
    $('.maxCounter').text('140');
  });  

//Get tweets from the database and called the render function
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'get',
  }).then(renderTweets);
};
$('.right-nav').click(function(event) {
  event.preventDefault();
  $('#tweet-text').focus();
});
  loadTweets();
});

