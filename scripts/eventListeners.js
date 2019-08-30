'use strict';
// eslint-disable-next-line no-unused-vars
/* global bookmarkList, store, api */
// eslint-disable-next-line no-unused-vars
const bookmarkList = ( function() {
//will generate form to add a new bookmark to the DOM
  function addBookmarkClicked() {
    $('#bookmark-form-section').on('click', '.addBookmark-button', function(event) {
      event.preventDefault();
      $('#bookmark-form-section').html(`
      <form action='submit' id="js-bookmark-form">
        <h2>Please enter in a new bookmark!</h2>
        <div>
          <label for="text-name"></label>
          <input type="text" name="title" id="text-name" placeholder='title' required>
          <label for="text-url"></label>
          <input type="url" value='https://' name="url" id="text-url" pattern="https://.*\..com" placeholder='https://'>
          <label for="text-description"></label>
          <input type="text" name="desc" id="text-description" placeholder='description... (optional)'>
          <label for="text-rating"></label>
          <input type="number" name="rating" id="text-rating" min='1' max='5' placeholder='rating 1-5' required>
          <div class='addBookmarkForm-buttons'>
            <button type='submit' value='Submit' id='submit-bookmark-form-data'>Submit</button>
            <button type='submit' value='Cancel' id='cancel-bookmark-form-data'>Cancel</button>
          </div>
        </div>
      </form>
    `);
    });
  }

  //will revert to initial load page 
  function revertToInitialLoad() {
    $('#bookmark-form-section').html(`
    <button type="submit" value="Add Bookmark!" class='addBookmark-button'>Add Bookmark!</button>
    <select type="dropdown" name="filterByRating" class="js-filter-rating">
      <option selected='true' value="1">Filter By:</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  `);
  }

  function watchCancelBookmarkAdd() {
    $('#bookmark-form-section').on('click', '#cancel-bookmark-form-data', function(event) {
      event.preventDefault();
      revertToInitialLoad();
      renderPage();
    });
  }

  //extracts data from the form 
  //uses store createId function to add an id
  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    store.createId(o);
    store.createExpandedView(o);
    return JSON.stringify(o);
  }

  //will watch the add bookmark form
  function watchAddBookmarkForm() {
    $('#bookmark-form-section').on('submit', '#js-bookmark-form', function(event) {
      event.preventDefault();
      let formElement = $('#js-bookmark-form')[0];
      const jsonObject = serializeJson(formElement);
      api.createBookmark(jsonObject)
        .then(newBookmark => {
          store.addBookmark(newBookmark);
          revertToInitialLoad();
          renderPage();
        });
    });
  }

  //will create how the bookmark will appear on the DOM
  function generateBookmarkElement(bookmark) {
    if(bookmark.expandedView === true) {
      return `
        <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
          <div class='unexpanded-div'>
            <span class='bookmarkTitle'>${bookmark.title} |</span>
            <span class='bookmarkRating'>Rating: ${bookmark.rating}</span>
            <button type='button' id='expandView'>Expand</button>
          </div>
          <div class='expanded-div'>
            <span class='bookmarkDescription'>Description: ${bookmark.desc} | ${bookmark.url}</span>
            <div class='expanded-buttons'>
              <button type='button' class='visitSite' onclick="window.open('${bookmark.url}'),'_blank','resizable=yes'">Visit Site</button>
              <button type='button' id='deleteBookmark'>Delete</button>
            </div>
          </div>
        </li>`;
    } else {
      return `
      <li class='js-bookmark-element' data-bookmark-id='${bookmark.id}'>
          <div class='unexpanded-div'>
            <span class='bookmarkTitle'>${bookmark.title} |</span>
            <span class='bookmarkRating'>Rating: ${bookmark.rating}</span>
            <button type='button' id='expandView'>Expand</button>
          </div>
      </li>
      `;
    }
  }

  function generateBookmarksString(bookmarks) {
    const newBookmarks = bookmarks.map((list) => generateBookmarkElement(list));
    return newBookmarks.join('');
  }

  //will add the new bookmark element on the DOM
  function renderPage() {
    let bookmarks = [...store.list];

    if(store.list.expandedView === undefined) {
      store.createExpandedView(bookmarks);
    }

    if(store.searchNumber) {
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.searchNumber);
    }

    const bookmarkListString = generateBookmarksString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  }

  //will filter bookmarks currently in DOM
  //filter based on 1-5 rating system
  function filterBookmarksWasClicked() {
    $('#bookmark-form-section').on('mouseup', '.js-filter-rating', function(event) {
      let val = $(event.currentTarget).val();
      store.searchNumber = val;
      renderPage();
    });
  }

  function getBookmarkId(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  //will handle deletion of bookmark if delete button clicked
  function handleBookmarkDelete() {
    $('.js-bookmark-list').on('click', '#deleteBookmark', function(event) {
      event.preventDefault();
      const id = getBookmarkId(event.currentTarget);
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          renderPage();
        });
    });
  }

  //will handle if expanded view is clicked on bookmark
  function handleExpandedView() {
    $('.js-bookmark-list').on('click', '#expandView', function(event) {
      event.preventDefault();
      const id = getBookmarkId(event.currentTarget);
      const storeObject = store.findById(id);
      store.toggleExpandedView(storeObject);
      renderPage();
    });
  }

  //will render the added information onto the DOM
  function bindEventListeners() {
    addBookmarkClicked();
    watchCancelBookmarkAdd();
    watchAddBookmarkForm();
    handleBookmarkDelete();
    handleExpandedView();
    filterBookmarksWasClicked();
  }

  return {
    bindEventListeners,
    renderPage,
  };

}());
