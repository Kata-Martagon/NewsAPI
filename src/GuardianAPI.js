/* global fetchAPI, GUARDIAN_API_KEY */
const GuardianAPI = (function wrapper() {
  const BASE_QUERY_PARAMS = {
    q: 'brexit',
    'show-fields': 'standfirst',
    pageSize: '50',
    'order-by': 'newest',
    'api-key': GUARDIAN_API_KEY,
  };

  function buildQueryString(queryParams) {
    return Object.keys(queryParams)
                 .map(key => `${key}=${queryParams[key]}`)
                 .join('&');
  }

  function buildQueryParams(q, fromDate, toDate) {
    const queryParams = {
      q,
      'from-date': fromDate,
      'to-date': toDate,
    };

    return Object.assign({}, BASE_QUERY_PARAMS, queryParams);
  }

  function buildUrl(pathVariables, queryParams) {
    return `http://content.guardianapis.com/${pathVariables.join('/')}?${buildQueryString(queryParams)}`;
  }

  function toStandardArticle(guardianArticle) {
    return {
      title: guardianArticle.webTitle,
      publicationDate: guardianArticle.webPublicationDate,
      url: guardianArticle.webUrl,
      tagline: guardianArticle.fields ? guardianArticle.fields.standfirst : '',
    };
  }

  function toStandardArticles(results) {
    return results.map(toStandardArticle);
  }

  function getArticlesFromResponse(data) {
    return data.response.results;
  }

  function getArticles(date) {
    const q = 'brexit';
    const fromDate = date;
    const toDate = date;

    const url = buildUrl(['search'], buildQueryParams(q, fromDate, toDate));

    return fetchAPI(url)
              .then(getArticlesFromResponse)
              .then(toStandardArticles);
  }

  return {
    getArticles,
    TEST: { buildUrl },
  };
}());

window.GuardianAPI = GuardianAPI;
