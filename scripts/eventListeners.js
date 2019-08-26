'use strict';
// eslint-disable-next-line no-unused-vars
/* global bookmarkList, store, api */

const bookmarkList = ( function() {
//will generate form to add a new bookmark to the DOM
  function addBookmarkClicked() {
    $('#bookmark-form-section').on('click', '.addBookmark-button', function(event) {
      event.preventDefault();
      console.log('addBookmark clicked!');
      $('#bookmark-form-section').html(`
      <form action='submit' id="js-bookmark-form">
        <h2>Please enter in a new bookmark!</h2>
        <div>
          <label for="text-name">Name:</label>
          <input type="text" name="title" id="text-name">
          <label for="text-url">URL:</label>
          <input type="url" value='https://' name="url" id="text-url">
          <label for="text-description">Description:</label>
          <input type="text" name="description" id="text-description">
          <label for="text-rating">Rating:</label>
          <input type="number" name="rating" id="text-rating" min='1' max='5'>
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

  //extracts data from the form 
  //uses store createId function to add an id
  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    store.createId(o);
    return JSON.stringify(o);
  }

  //will watch the add bookmark form
  function watchAddBookmarkForm() {
    $('#bookmark-form-section').on('submit', '#js-bookmark-form', function(event) {
      event.preventDefault();
      console.log('I\'m running!');
      let formElement = $('#js-bookmark-form')[0];
      serializeJson(formElement);
      api.createBookmark(formElement)
        .then(newBookmark => {
          store.addBookmark(newBookmark);
          generateBookmarkOnPage();
          revertToInitialLoad();
        });
    });
  }

  //will create how the bookmark will appear on the DOM
  function generateBookmarkElement(bookmark) {
    return `
      <li class='js-bookmark-element'>
        <div>
          <span class='bookmarkTitle'>${bookmark.name} |</span>
          <span class='bookmarkRating'>Rating: ${bookmark.rating}</span>
        </div>
        <div>
          <span class='bookmarkDescription'>Description: ${bookmark.description}</span>
          <input type='button' onclick="window.open('${bookmark.url}','_blank','resizable=yes'>
        </div>
      </li>`;
  }

  function generateBookmarksString(bookmarks) {
    const newBookmarks = bookmarks.map((list) => generateBookmarkElement(list));
    return newBookmarks.join('');
  }

  //will add the new bookmark element on the DOM
  function generateBookmarkOnPage() {
    let bookmarks = [...store.list];
    const bookmarkListString = generateBookmarksString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  }

  //will filter bookmarks currently in DOM
  //filter based on 1-5 rating system
  function filterBookmarksWasClicked() {}

  //will handle deletion of bookmark if delete button clicked
  function handleBookmarkDelete() {}

  //will handle if expanded view is clicked on bookmark
  function handleExpandedView() {}

  //will render the added information onto the DOM
  function bindEventListeners() {
    console.log('renderPage ran');
    addBookmarkClicked();
    watchAddBookmarkForm();
  }

  return {
    bindEventListeners,
    generateBookmarkOnPage,
  };

}());
