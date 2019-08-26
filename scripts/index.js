'use strict';
/* global bookmarkList, store, api */

$(document).ready(function() {
  bookmarkList.bindEventListeners();

  // On initial load, fetch bookmarks and render
  api.getBookmarks()
    .then((bookmark) => {
      bookmark.forEach((item) => store.addBookmark(item));
      bookmarkList.generateBookmarkOnPage();
    })
    .catch(err => console.log(err.message));
});