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

var domManipulator = function(obj) {
  var articleInfo = obj.response.docs.map(function(article) {

   return (
    '<div>Question Title: ' + article.headline.main + '</div>' +
    '<div>Link: <a href="' + article.web_url + '">Click here</a></div>' +
    '<div>Summary: ' + article.snippet + '</div>' +
    '</br>'
  )
  })
    document.getElementById('results-body').innerHTML = articleInfo.join('')
}

var url = urlBuilder('referendum', 'europe and britain', '8310a722a1af4fe39644eee195781143')

fetchAPI(url, 'GET', domManipulator)
