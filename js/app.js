/* global fetchAPI */

function urlBuilder(param1, param2, apikey) {
  const query = {
    q: param1, // Search terms
    fq: param2,
    'api-key': apikey,
  };
  const baseUrlPath = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
  .join('&');

  const url = `${baseUrlPath}?${queryString}`;
  return url;
}

const url = urlBuilder('referendum', 'europe and britain', '8310a722a1af4fe39644eee195781143');

function parseData(obj) {
  return obj.response.docs.map(article => ({
    title: article.headline.main,
    link: article.web_url,
    snippet: article.snippet,
  }));
}

fetchAPI(url, 'GET', parseData);
