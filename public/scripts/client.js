/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Loops through database of tweets and appends them to the tweet container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  // Creates html output with given information
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
    $tweet += `<p class="feet">${time(tweet.created_at)}</p>`;
    $tweet += `<p class="feet">Flag Retweet Like</p>`;
    $tweet += "</footer>";
    $tweet += "</article>";
    return $tweet;
  };
  // Posts inputted tweet to database then fetches updated database
  $('form').on('submit', function(event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $(".error1").append('Tweet is too long');
      $(".error").slideDown();
    } else if ($('#tweet-text').val() === '') {
      $(".error2").append('Please enter a tweet');
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
          $("textarea").val("");
          $(".counter").val(140);
          console.log('Success');
        });
    }
  });
  //Fetcher used in previous function
  const loadTweets = function() {
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

// Time stamp function

const time = created => {
  const diff = Date.now() - created;
  if (diff < 1000) {
    return "Just now";
  } else if (diff < 60000) {
    return Math.floor(diff / 1000) + " second(s) ago";
  } else if (diff < 360000) {
    return Math.floor(diff / 60000) + " minute(s) ago";
  } else if (diff < 86400000) {
    return Math.floor(diff / 360000) + " hour(s) ago";
  } else if (diff < 31536000000) {
    return Math.floor(diff / 86400000) + " day(s) ago";
  } else {
    return Math.floor(diff / 31536000000) + " year(s) ago";
  }
};
