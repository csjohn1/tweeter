$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let counter = 140 - $(this).val().length;
    if (counter < 0) {
      document.getElementById("counter").style.color = "red";
    } else {
      document.getElementById("counter").style.color = "#606060";
    }
    $(this).closest('form').find('#counter').text(counter);
  })  
});