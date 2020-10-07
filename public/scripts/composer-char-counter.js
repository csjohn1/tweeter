$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let counter = 140 - $(this).val().length;
    $(this).closest('form').find('#counter').text(counter);
  })  
});