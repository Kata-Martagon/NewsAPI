

function displayArticleInfoNYT (article) {
  // docs.headline.main, web_url (the link), snippet
  return (
    '<div>Question Title: ' + article.headline.main + '</div>' +
    '<div>Link: <a href="' + article.web_url + '">Click here</a></div>' +
    '<div>Summary: ' + article.snippet + '</div>' +
    '</br>'
  )
}

function updateResultsBody (elements) {
  document.getElementById('results-body').innerHTML = elements.join('')
}

updateContentNYT('referendum', 'europe and britain', '8310a722a1af4fe39644eee195781143');

function updateContentNYT(param1, param2, key) {

  query = {
    q : param1, //Search terms
    fq: param2,
    'api-key' : key
  }

  var baseUrlAndPath = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  var queryString = Object.keys(query).map(function (key) {
    return key + '=' + query[key]
  }).join('&')

  var xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function() {
    if(xhr.status === 200) {
      var AJAXreturn = JSON.parse(xhr.response)
      console.log(AJAXreturn)
      var questions = AJAXreturn.response.docs.map(displayArticleInfoNYT)

      updateResultsBody(questions)
      }
  })

  xhr.open('GET', baseUrlAndPath + '?' + queryString)
  xhr.send()
}
