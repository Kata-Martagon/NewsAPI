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
