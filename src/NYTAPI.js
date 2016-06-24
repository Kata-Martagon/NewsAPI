/* global fetchAPI, NYT_API_KEY */
const NYTAPI = (function wrapper() {
  const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const BASE_QUERY_PARAMS = { 'api-key': NYT_API_KEY };

  function buildQueryString(queryParams) {
    return Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
  }

  function buildQueryParams(q, fq, fromDate, toDate) {
    const queryParams = {
      q,
      fq,
      'from-date': fromDate,
      'to-date': toDate,
    };

    return Object.assign({}, BASE_QUERY_PARAMS, queryParams);
  }

  function buildUrl(queryParams) {
    return `${BASE_URL}?${buildQueryString(queryParams)}`;
  }

  function getArticlesFromResponse(data) {
    return data.response.docs;
  }

  function toStandardArticle(nytArticle) {
    return {
      title: nytArticle.headline.main,
      publicationDate: nytArticle.pub_date,
      url: nytArticle.web_url,
      tagline: nytArticle.snippet,
    };
  }

  function toStandardArticles(results) {
    return results.map(toStandardArticle);
  }

  function getArticles(date) {
    const q = 'referendum';
    const fq = 'europe and britain';
    const fromDate = date;
    const toDate = date;

    const url = buildUrl(buildQueryParams(q, fq, fromDate, toDate));

    return fetchAPI(url)
              .then(getArticlesFromResponse)
              .then(toStandardArticles);
  }

  return { getArticles };
}());

window.NYTAPI = NYTAPI;
