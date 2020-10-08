/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

const createTweetElement = function(tweet) {
  let $tweet = "";
  $tweet += `<article class="tweetcontainer">`
   $tweet += "<header>"
   $tweet += `<p class="header-right">`
   $tweet += `<img src=${tweet.user.avatars}>`
   $tweet += `${tweet.user.name}</p>`
   $tweet += `<p class="handle">${tweet.user.handle}</p>`
   $tweet += "</header>"
   $tweet += `<div class="tweet-body">`
   $tweet += `<p>${tweet.content.text}</p>`
   $tweet += "</div>"
   $tweet += "<footer>"
   $tweet += `<p class="feet">${tweet.created_at}</p>`
  //  $tweet += `<p class="feet">${Date.now()}</p>`
   $tweet += `<p class="feet">misc</p>`
   $tweet += "</footer>"
   $tweet += "</article>"
  return $tweet;
}

  $('form').on('submit', function () {
    event.preventDefault()
    console.log('Button clicked, performing ajax call...');
    $.ajax({
      url:'/tweets/', 
      method: 'POST',
      data: $('#tweet-text').serialize()
    })
    .then(function () {
      console.log('Success');
      console.log($('#tweet-text').serialize());
      console.log($(this).closest('form').find('#tweet-text').text('#tweet-text').serialize());
    });
  });

const loadTweets = function() {
    console.log("YES!")
    $.ajax({
      url: "/tweets/",
      method: "GET"
    })
    .then(function(data) {
      renderTweets(data);
    })
}
loadTweets();

});
