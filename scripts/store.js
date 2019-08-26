'use strict';
// eslint-disable-next-line no-unused-vars

const store = (function() {

  const addBookmark = function(bookmark) {
    this.list.push(bookmark);
  };

  const createId = function(bookmark) {
    bookmark['id'] = cuid();
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
    createId,
    findById,
    findAndDelete
  };

}());