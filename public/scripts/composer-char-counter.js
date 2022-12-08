$(document).ready(function() {

  $("#tweet-text").on("input", function() {
   
    const maxLength = 140;

    //Tracking character count input from user using keyup
    const tweetLength = $(this).val().length;
    const remainingChars = maxLength - tweetLength;

    let counter = $('.maxCounter');

    //Updating counter elem on DOM to reflect current changes in remaining characters
    counter.html(remainingChars);

    if (remainingChars < 0) {
      counter.css('color', '#8f0001');
    } else {
      counter.css('color', '#000000');
    }
  });
});