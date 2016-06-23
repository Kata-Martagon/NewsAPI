function createQueryString(query) {
  return Object.keys(query)
               .map(key => `${key}=${query[key]}`)
               .join('&');
}

function createUrl(baseURL, extensions, query) {
  return `${baseURL}${extensions.join('/')}?${createQueryString(query)}`;
}

window.createUrl = createUrl;
