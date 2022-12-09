/*
 * Client-side JS
 * jQuery is already loaded
  */

$(document).ready(function() {

  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="name-avatar">
          <div>
            <img src="${tweet.user.avatars}"></img>
            <p>${tweet.user.name}</p>
          </div>
          <p class="last-name">${tweet.user.handle}</p>
        </div>
      </header>
      <p class="content">${tweet.content.text}</p>
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
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };
  
  const fetchTweetsWithAjax = function() {
    $.ajax({
      url: '/tweets',
      method: 'get',
    }).then(renderTweets)
  };
  
  $('#form').submit(function(event){
    const tweetData =  $(this).serialize();
  if (tweetData.length === 0) {
    event.preventDefault();
    alert ("Please write TWEET before submission.");
  } else if(tweetData.length > 140) {
    event.preventDefault();
    alert ("The text entered exceeds the maximum length!");
  } else {
    event.preventDefault(); //prevent default action 
  $("#form")[0].reset();
    $.ajax({
      url : '/tweets',
      method: 'post',
      tweetData
    }).then(fetchTweetsWithAjax);
  }
  })
  })
  