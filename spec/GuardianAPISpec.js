/* global describe, it */

describe('GuardianAPI', function () {
  it('a basic environment test', function () {
    expect(true).toBe(true)
  })
})

describe('query/URL builder', function () {

  it('should combine Base URL, extensions and queries correctly', function () {
    query = {
      q : 'brexit',
      'api-key' : 123,
    }
    extensions = ['Search'];
    var baseURL = 'http://www.google.com/'

    expect(createUrl(baseURL, extensions, query)).toBe('http://www.google.com/Search?q=brexit&api-key=123')
  })
})

describe('API call', function () {

  var apiReturn = 0

  beforeEach(function(done) {
    query = {
      q : 'brexit',
      'api-key' : guardianAPIKey,
    }
    extensions = ['search'];
    var baseURL = 'http://content.guardianapis.com/'

    callSuccess = fetchAPI(createUrl(baseURL, extensions, query))
    callSuccess.then(function(value){
      apiReturn = value
      done()
    })
  });

  it('promise from valid API endpoint should return an object', function (done) {
    expect(typeof apiReturn).toBe('object')
    done()
  })
})

describe('API call and filter', function () {

  var apiReturn = 0

  beforeEach(function(done) {
    query = {
      q : 'brexit',
      'api-key' : guardianAPIKey,
    }
    extensions = ['search'];
    var baseURL = 'http://content.guardianapis.com/'

    callSuccess = fetchAPI(createUrl(baseURL, extensions, query))
    callSuccess.then(function(value) {
      apiReturn = value.response.results
      done()
    })
  });

  it('function called when promise fulfills array of articles from return value', function (done) {
    expect(apiReturn instanceof Array).toBe(true)
    done()
  })
})
