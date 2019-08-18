'use strict';

const apiKey = 'rKXupa0Li4XXNldGuVmaoP7h3PyUshZf6tytzI0y'; 
const searchUrl = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i<responseJson.data.length; i++) {
      $('#results-list').append(`
        <li><h3>${responseJson.data[i].fullName}</h3> 
        <p>${responseJson.data[i].description}</p>
        <p><span class='bold'>How to get there:</span> ${responseJson.data[i].directionsInfo}</p>
        <p>US State: <span class='bold'>${responseJson.data[i].states}</span></p>
        <p>Visit offical page: <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a></p>
        </li>
        `)
    };
    $('#results').removeClass('hidden');
  }
  
  function getNationalParks(query,limit=10) {
    const params = {
      api_key: apiKey,
      q: query,
      limit: limit
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const limit = $('#js-max-results').val();
      getNationalParks(searchTerm,limit);
    });
  }
  
  $(watchForm);