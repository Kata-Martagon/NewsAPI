



function createUrl(baseURL, extensions, query) {
  return baseURL + extensions.join('/') + '?' +
  Object.keys(query).map(function(key){
    return key + '=' + query[key];
  }).join('&');
}
