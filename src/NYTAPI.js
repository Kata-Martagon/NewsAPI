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
    // const queryParams = buildQueryParams(q, fq, fromDate, toDate);
    return `${BASE_URL}?${buildQueryString(queryParams)}`;
  }

  function getArticlesFromResponse(data) {
    return data.response.docs;
  }

  // TODO: Add publication date
  function fromNYTToStandardArticle(nytArticle) {
    return {
      title: nytArticle.headline.main,
      publicationDate: 'tbd',
      link: nytArticle.web_url,
      tagline: nytArticle.snippet,
    };
  }

  function fromNYTToStandardArticles(results) {
    return results.map(fromNYTToStandardArticle);
  }

  function getArticles() {
    const q = 'referendum';
    const fq = 'europe and britain';
    const fromDate = '2016-06-20';
    const toDate = '2016-06-20';

    const url = buildUrl(buildQueryParams(q, fq, fromDate, toDate));

    return fetchAPI(url)
              .then(getArticlesFromResponse)
              .then(fromNYTToStandardArticles);
  }

  return { getArticles };

  // const urlNYT = buildURL('referendum', 'europe and britain', '2016-06-23', '2016-06-23');

  // function parseData(obj) {
  //   return obj.response.docs.map(article => ({
  //     title: article.headline.main,
  //     link: article.web_url,
  //     tagline: article.snippet,
  //   }));
  // }
  //
  // window.urlNYT = urlNYT;
  // window.parseData = parseData;
}());

window.NYTAPI = NYTAPI;
