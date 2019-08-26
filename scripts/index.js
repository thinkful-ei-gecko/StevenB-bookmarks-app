'use strict';

//will generate form to add a new bookmark to the DOM
function addBookmarkClicked() {
  $('#bookmark-form-section').on('click', '.addBookmark-button', function(event) {
    event.preventDefault();
    console.log('addBookmark clicked!');
    $('#bookmark-form-section').html(`
      <form action='submit' id="js-bookmark-form">
        <div>
          <label for="text-name">Name:</label>
          <input type="text" name="text-name" class="js-website-name">
          <label for="text-url">URL:</label>
          <input type="url" value='https://' name="text-url" class="js-website-url">
          <label for="text-description">Description:</label>
          <input type="text" name="text-description" class="js-website-description">
          <label for="text-rating">Rating:</label>
          <input type="text" name="text-rating" class="js-website-rating">
          <button type='submit' value='Submit' id='submit-bookmark-form-data'>Submit</button>
        </div>
      </form>
    `);
  });
}

//will revert to initial load page 
function revertToInitialLoad() {
  console.log('Reverting to Initial Load!');
  $('#bookmark-form-section').html(`
    <button type="submit" value="Add Bookmark!" class='addBookmark-button'>Add Bookmark!</button>
    <label for="filterByRating">Filter By Rating:</label>
    <input type="number" name="filterByRating" class="js-filter-rating" min='1' max='5' step='1'>
  `);
}

//will watch the add bookmark form
function watchAddBookmarkForm() {
  $('#bookmark-form-section').on('submit', '#js-bookmark-form', function(event) {
    event.preventDefault();
    console.log('I\'m running!');
    const websiteName = $('.js-website-name').val();
    const websiteURL = $('.js-website-url').val();
    const websiteDescription = $('.js-website-description').val();
    const websiteRating = $('.js-website-rating').val();
    console.log(`You entered the name: ${websiteName} for: ${websiteURL} with a description of: ${websiteDescription} and a rating of: ${websiteRating}!`);
    revertToInitialLoad();
  });
}

//will filter bookmarks currently in DOM
//filter based on 1-5 rating system
function filterBookmarksWasClicked() {}

//will handle deletion of bookmark if delete button clicked
function handleBookmarkDelete() {}

//will handle if expanded view is clicked on bookmark
function handleExpandedView() {}

//will render the added information onto the DOM
function renderPage() {
  console.log('renderPage ran');
  addBookmarkClicked();
  watchAddBookmarkForm();
}

$(renderPage);