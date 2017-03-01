require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = {

  getArtist: function(url) {
    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      });
  },

  getAlbums: function(url) {
    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      });
  },

  getAlbumInfo: function(url) {
    return fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      });
  }

};
