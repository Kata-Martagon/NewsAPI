/* global fetchAPI, NYTAPIKey */

function urlBuilder(param1, param2, startDate, endDate) {
  const query = {
    q: param1,
    fq: param2,
    'from-date': startDate,
    'to-date': endDate,
    'api-key': NYTAPIKey,
  };

  const baseUrlPath = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const queryString = Object.keys(query).map(key => `${key}=${query[key]}`)
  .join('&');


  const url = `${baseUrlPath}?${queryString}`;
  return url;
}

const urlNYT = urlBuilder('referendum', 'europe and britain', '2016-06-23', '2016-06-23');


function parseData(obj) {
  console.log(obj);
  return obj.response.docs.map(article => ({
    title: article.headline.main,
    link: article.web_url,
    tagline: article.snippet,
  }));
}

window.urlNYT = urlNYT;
window.parseData = parseData;
