function urlBuilder(param1, param2, key) {
  const query = {
    q : param1, //Search terms
    fq: param2,
    'api-key' : key
  }
  const baseUrlAndPath = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  var queryString = Object.keys(query).map(function (key) {
    return key + '=' + query[key]
  }).join('&')

  const url = baseUrlAndPath + '?' + queryString
  return url
}

var url = urlBuilder('referendum', 'europe and britain', '8310a722a1af4fe39644eee195781143')

function parseData (obj) {
  return obj.response.docs.map(function (article) {
    return {
      title: article.headline.main,
      link: article.web_url,
      snippet: article.snippet
    }
  })
}

fetchAPI(url, 'GET', parseData)
