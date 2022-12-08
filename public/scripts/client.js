/*
 * Client-side JS
 * jQuery is already loaded
  */

$(document).ready(() {

  //Hardcoded Tweets Data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  let $tweet = `
  <article class="tweet">
    <header class="tweet-header">
      <div class="name-avatar">
        <div>
          <img src="${data.user.avatars}"></img>
          <p>${data.user.name}</p>
        </div>
        <p class="last-name">${data.user.handle}</p>
      </div>
    </header>
    <p class="content">${data.content.text}</p>
    <footer class="tweet-footer">
      <div>
        <p>${data.created_at}</p>
      </div>
      <div class="image-class">
      <i class="fa-solid fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>`
return $tweet;
}

const renderTweets = function (tweets) {

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets containe
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    const $alltweets = $('.tweet-container');
    $alltweets.append($tweet);
  }
};
renderTweets(data);
})