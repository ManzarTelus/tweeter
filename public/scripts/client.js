/*
 * Client-side JS
 * jQuery is already loaded
  */

$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="name-avatar">
          <div>
            <img name=avatar src=${tweet.user.avatars}>
            <div class="user" name="name">${tweet.user.name}</div>
          </div>
          <p class="handle" name="handle">${tweet.user.handle}</p>
        </div>
      </header>
      <p class="tweet-text" name="tweet-text">${tweet.content.text}</content>
      </p>
      <footer class="tweet-footer">
        <div>
          <p>${timeago.format(tweet.created_at)}</p>
        </div>
        <div class="image-class">
        <i class="fa-solid fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
    </article>`);
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and prepend it to the tweets container
    $('.tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'get',
    }).then(renderTweets);
  };
  
  $('#form').submit(function(event) {
    event.preventDefault();
    const tweetData =  $(this).serialize();
    const input = $("<div>").text($("#tweet-text").val());
    if (input.length === 0) {
      alert("Please write TWEET before submission.");
      return;
    }
    if (input.length > 140) {
      alert("The text entered exceeds the maximum length!");
      return;
    }
    $("#form")[0].reset();
    $.ajax({
      url : '/tweets',
      method: 'post',
      tweetData
    }).then(loadTweets);
  });
  loadTweets();
});
  
  