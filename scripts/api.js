'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/StevenB/bookmarks';

  //setup error handling wrapper function
  const handleAPIFetch = function(...args) {
    let error;
    return fetch(...args)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        error = response.statusText;
      })
      .then(data => {
        return data;
      })
      .catch(error);
  };

  const getBoomarks = function() {
    return handleAPIFetch(BASE_URL);
  };

  const createBookmark = function(bookmarkOject) {
    return handleAPIFetch(BASE_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: bookmarkOject
    });
  };

  const deleteBookmark = function(id) {
    return handleAPIFetch(BASE_URL + '/' + id, {
      method: 'DELETE'
    });
  };

  return {
    getBoomarks,
    createBookmark,
    deleteBookmark
  };

}());