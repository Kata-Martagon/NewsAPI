



updateContent('brexit', guardianAPIKey);

function updateContent(searchString, key) {

  query = {
    q : searchString, //Search terms
    'api-key' : key
  }

  var baseURL = 'http://content.guardianapis.com/'
  var path = 'search'
  var queryString = Object.keys(query).map(function(key) {
    return key + '=' + query[key]
  }).join('&')


  var xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function() {
    if (xhr.status === 200)
    var response = JSON.parse(xhr.response)
    console.log(response)
  })

xhr.open('GET', baseURL + path + '?' + queryString)
xhr.send()

}
