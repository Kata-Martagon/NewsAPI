function createQueryString(query) {
  return Object.keys(query)
               .map(key => `${key}=${query[key]}`)
               .join('&');
}

function createUrl(baseURL, extensions, query) {
  return `${baseURL}${extensions.join('/')}?${createQueryString(query)}`;
}

function fromGuardianToStandardArticleFormat(data) {
  return data.response.results.map(article => ({
    title: article.webTitle,
    publicationDate: article.webPublicationDate,
    url: article.webUrl,
    tagline: article.fields ? article.fields.standfirst : '',
  }));
}

window.createUrl = createUrl;
window.fromGuardianToStandardArticleFormat = fromGuardianToStandardArticleFormat;
