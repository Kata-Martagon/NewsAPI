

query = {
  q : 'brexit',
  'api-key' : guardianAPIKey,
}
extensions = ['search'];
var baseURL = 'http://content.guardianapis.com/'

callSuccess = fetchAPI(createUrl(baseURL, extensions, query))
callSuccess.then(function(value){
  apiReturn = value.response.results
})




function createUrl(baseURL, extensions, query) {
  return baseURL + extensions.join('/') + '?' +
  Object.keys(query).map(function(key){
    return key + '=' + query[key];
  }).join('&');
}
