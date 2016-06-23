/* global describe, beforeEach, afterEach, it, expect, jasmine, fetchAPI */
describe('fetchAPI', () => {
  const testURL = 'my/test/url';

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should be a function', () => {
    expect(typeof fetchAPI).toBe('function');
  });

  it('should create an xhr request', () => {
    fetchAPI();
    const request = jasmine.Ajax.requests.mostRecent();
    expect(request).not.toBeUndefined();
  });

  it('should create xhr request with supplied url', () => {
    fetchAPI(testURL);
    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toBe(testURL);
  });

  it('should create xhr request with supplied method', () => {
    fetchAPI(testURL, 'POST');
    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.method).toBe('POST');
  });

  it('should create xhr request with method GET by default', () => {
    fetchAPI(testURL);
    const request = jasmine.Ajax.requests.mostRecent();
    expect(request.method).toBe('GET');
  });

  it('should call done callback with requested data', () => {
    const onDone = jasmine.createSpy('success');
    fetchAPI(testURL, 'GET', onDone);
    const request = jasmine.Ajax.requests.mostRecent();

    expect(request.url).toBe(testURL);
    expect(onDone).not.toHaveBeenCalled();

    request.respondWith({
      status: 200,
      contentType: 'application/json',
      responseText: '{"data":[1,2,3,4]}',
    });

    expect(onDone).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalledWith(JSON.parse('{"data":[1,2,3,4]}'));
  });

  it('should return a promise if no callback provided', (done) => {
    const promise = fetchAPI(testURL, 'GET');
    const request = jasmine.Ajax.requests.mostRecent();

    expect(request.url).toBe(testURL);

    request.respondWith({
      status: 200,
      contentType: 'application/json',
      responseText: '{"data":[1,2,3,4]}',
    });

    expect(typeof promise).toBe('object');

    promise.then((response) => {
      expect(response).toEqual(JSON.parse('{"data":[1,2,3,4]}'));
      done();
    });
  });
});
