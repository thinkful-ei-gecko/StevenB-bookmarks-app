'use strict';
/* global cuid */
// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const createId = function(bookmark) {
    bookmark['id'] = cuid();
  };

  const createExpandedView = function(bookmark) {
    bookmark['expandedView'] = false;
  };

  const toggleExpandedView = function (bookmark) {
    return bookmark.expandedView = !bookmark.expandedView;
  };

  const findById = function(id) {
    return this.list.find(bookmark => bookmark.id === id);
  };

  /* const filterByRating = function(rating) {
    this.list = this.list.filter(bookmark => bookmark.rating >= rating);
  }; */

  /* const clearTheFilter = function() {
    this.list = ;
  } */

  const findAndDelete = function(id) {
    this.list = this.list.filter(bookmark => bookmark.id !== id);
  };

  return {
    list:[],
    adding: false,
    searchNumber: null,

    addBookmark,
    createId,
    createExpandedView,
    toggleExpandedView,
    findById,
    // filterByRating,
    // clearTheFilter,
    findAndDelete
  };

}());