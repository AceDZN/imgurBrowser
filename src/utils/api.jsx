var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var apiKey = 'c23478b5753f4e2';

module.exports = window.api = {
  get: function(url){
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': 'Client-ID '+apiKey
      }
    })
    .then(function(response){
      return response.json();
    })
    /*
    .then(function(data){
      console.log(data);
    })
    */
    ;
  }
};
