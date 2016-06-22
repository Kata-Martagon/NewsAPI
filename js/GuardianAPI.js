


function updateContent() {

var baseURL = 'http://content.guardianapis.com/'
var path = 'search'

query = {
  searchTerms : seachString
  api-key : 
}

var xhr = new XMLHttpRequest()

xhr.addEventListener('load', function() {
  if (xhr.status === 200)
  var response = JSON.parse(xhr.response)
})

xhr.open('GET', baseURL + path + '?' + queryString)
xhr.send()

}
