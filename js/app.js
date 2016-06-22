

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
  console.log(baseUrlAndPath + '?' + queryString)
  console.log('Postman: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=referendum&fq=europe and britain&api-key=8310a722a1af4fe39644eee195781143')


  var xhr = new XMLHttpRequest()
  console.log(xhr)

  xhr.addEventListener('load', function() {
     console.log(xhr.status)
    if(xhr.status === 200) {
      var response = JSON.parse(xhr.response)
      console.log(response)
        }
  })

  xhr.open('GET', baseUrlAndPath + '?' + queryString)
  xhr.send()
}
// function reqListener () {
//   console.log(this.responseText);
// }
//
// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", baseUrlAndPath + '?' + queryString);
// oReq.send();
// }
