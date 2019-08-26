'use strict';

//will filter bookmarks currently in DOM
//filter based on 1-5 rating system
function filterBookmarksWasClicked() {}

//will generate form to add a new bookmark to the DOM
function addBookmarkClicked() {}

//will watch the add bookmark form
function watchForm() {
  console.log('I\'m running!');
  $('#js-bookmark-form').submit( function(event) {
    event.preventDefault();
    const websiteName = $('.js-website-name').val();
    const websiteURL = $('.js-website-url').val();
    console.log(`You entered the name: ${websiteName} for: ${websiteURL}!`);
  });
}

//will render the added information onto the DOM
function renderPage() {}

$(watchForm);