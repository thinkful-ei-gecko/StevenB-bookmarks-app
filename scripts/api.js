'use strict';

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/StevenB/bookmarks';

  //setup error handling wrapper function
  const errorHandlingAPIFetch = function(...args) {
    let error,
    return fetch(...args)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        error = response.statusText;
      })
      .then(data => console.log(data))
      .catch(error);
  };

}());