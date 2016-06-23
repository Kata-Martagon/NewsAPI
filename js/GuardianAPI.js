

// function getMarkup(articles) {
//   console.log(articles.webTitle)
//   return articles.webTitle
// }


 const query = {
   q: 'brexit',  // Search terms
   'page-size' : 50,
   'api-key': guardianAPIKey,
 };
const baseURL = 'http://content.guardianapis.com/'
const path = 'search'

var p = xhrRequest(createURL(query, baseURL, path))
p.then(function (value) { console.log(value); })

function createURL(query, baseURL, path) {
  var queryString = Object.keys(query).map(function(key) {
    return key + '=' + query[key]
  }).join('&')
  return baseURL + path + '?' + queryString
}


function xhrRequest(URL, onDone) {
  var xhr = new XMLHttpRequest()
  var p = new Promise(function (resolve, reject) {
    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        if (onDone) {
          onDone(JSON.parse(xhr.response))
        } else {
          resolve(JSON.parse(xhr.response))
        }
      } else {
        reject(new Error(xhr.status))
      }
    })
    xhr.open('GET', URL)
    xhr.send()
  })
  return p
}
