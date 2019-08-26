'use strict';

const store = (function() {

  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const findById = function(id) {
    return this.list.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.list = this.list.filter(bookmark => bookmark.id !== id);
  };

  return {
    list:[],
    adding: false,

    addBookmark,
    findById,
    findAndDelete
  };

}());