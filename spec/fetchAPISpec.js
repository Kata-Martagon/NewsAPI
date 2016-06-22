describe('fetchAPI', function () {

  const testURL = 'my/test/url'
  let request

  beforeEach(function () {
    jasmine.Ajax.install()
  })

  afterEach(function () {
    jasmine.Ajax.uninstall()
  })

  it('should be a function', function () {
    expect(typeof fetchAPI).toBe('function')
  })

  it('should create an xhr request', function () {
    fetchAPI()
    const request = jasmine.Ajax.requests.mostRecent()
    expect(request).not.toBeUndefined()
  })

  it('should create xhr request with supplied url', function () {
    fetchAPI(testURL)
    const request = jasmine.Ajax.requests.mostRecent()
    expect(request.url).toBe(testURL)
  })

  it('should create xhr request with supplied method', function () {
    fetchAPI(testURL, 'POST')
    const request = jasmine.Ajax.requests.mostRecent()
    expect(request.method).toBe('POST')
  })

  it('should create xhr request with method GET by default', function () {
    fetchAPI(testURL)
    const request = jasmine.Ajax.requests.mostRecent()
    expect(request.method).toBe('GET')
  })

  it('should call done callback with requested data', function () {
    const onDone = jasmine.createSpy('success')
    fetchAPI(testURL, 'GET', onDone)
    const request = jasmine.Ajax.requests.mostRecent()

    expect(request.url).toBe(testURL)
    expect(onDone).not.toHaveBeenCalled()

    request.respondWith({
      status: 200,
      contentType: 'application/json',
      responseText: '{"data":[1,2,3,4]}'
    })

    expect(onDone).toHaveBeenCalled()
    expect(onDone).toHaveBeenCalledWith(JSON.parse('{"data":[1,2,3,4]}'))
  })

  it ('should return a promise if no callback provided', function (done) {
    const promise = fetchAPI(testURL, 'GET')
    const request = jasmine.Ajax.requests.mostRecent()

    expect(request.url).toBe(testURL)

    request.respondWith({
      status: 200,
      contentType: 'application/json',
      responseText: '{"data":[1,2,3,4]}'
    })

    expect(typeof promise).toBe('object')

    promise.then(function (response) {
      expect(response).toEqual(JSON.parse('{"data":[1,2,3,4]}'))
      done()
    })
  })
})
