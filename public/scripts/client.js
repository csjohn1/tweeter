/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  const createTweetElement = function(tweet) {
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let $tweet = "";
    $tweet += `<article class="tweetcontainer">`;
    $tweet += "<header>";
    $tweet += `<p class="header-right">`;
    $tweet += `<img src=${tweet.user.avatars}>`;
    $tweet += `${tweet.user.name}</p>`;
    $tweet += `<p class="handle">${tweet.user.handle}</p>`;
    $tweet += "</header>";
    $tweet += `<div class="tweet-body">`;
    $tweet += `<p class="tweet-text">${escape(tweet.content.text)}</p>`;
    $tweet += "</div>";
    $tweet += "<footer>";
    $tweet += `<p class="feet">${tweet.created_at}</p>`;
    //  $tweet += `<p class="feet">${Date.now()}</p>`
    $tweet += `<p class="feet" id="flag">Flag Retweet Like</p>`;
    $tweet += "</footer>";
    $tweet += "</article>";
    return $tweet;
  };

  $('form').on('submit', function(event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $(".error1").append('twete 2 long');
      $(".error").slideDown();
    } else if ($('#tweet-text').val() === '') {
      $(".error2").append('where the twete');
      $(".error").slideDown();
    } else {
      $(".error").slideUp();
      $(".error1").empty();
      $(".error2").empty();
      console.log('Button clicked, performing ajax call...');
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $('form').serialize()
      })
        .then(function() {
          loadTweets();
          console.log('Success');
        });
    }
  });

  const loadTweets = function() {
    console.log("YES!");
    $.ajax({
      url: "/tweets/",
      method: "GET"
    })
      .then(function(data) {
        let reverseData = data.reverse();
        $("#tweets-container").empty();
        renderTweets(reverseData);
      });
  };
  loadTweets();
});
