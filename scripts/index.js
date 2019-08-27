'use strict';
/* global bookmarkList, store, api */

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  // On initial load, fetch bookmarks and render
  api.getBoomarks()
    .then((bookmark) => {
      bookmark.forEach((item) => store.addBookmark(item));
      bookmarkList.renderPage();
    })
    .catch(err => alert(err.message));
});