/* global guardianAPIKey, fetchAPI */

function createQueryString(query) {
  return Object.keys(query)
               .map(key => `${key}=${query[key]}`)
               .join('&');
}

function createUrl(baseURL, extensions, query) {
  return `${baseURL}${extensions.join('/')}?${createQueryString(query)}`;
}

// const query = {
//   q: 'brexit',
//   'api-key': guardianAPIKey,
// };
//
// const extensions = ['search'];
//
// const baseURL = 'http://content.guardianapis.com/';
//
// const callSuccess = fetchAPI(createUrl(baseURL, extensions, query));
//
// callSuccess.then(value => value.response.results);

window.createUrl = createUrl;
