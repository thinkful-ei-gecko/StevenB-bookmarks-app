'use strict';

function watchForm() {
  console.log('I\'m running!');
  $('#js-bookmark-form').submit( function(event) {
    event.preventDefault();
    const websiteName = $('.js-website-name').val();
    const websiteURL = $('.js-website-url').val();
    console.log(`You entered the name: ${websiteName} for: ${websiteURL}!`);
  });
}

$(watchForm);