/* global describe, beforeEach, afterEach, it, expect, jasmine */

describe('suite wide usage', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('specifying response when you need it', () => {
    const doneFn = jasmine.createSpy('success');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        doneFn(xhr.responseText);
      }
    };

    xhr.open('GET', '/some/cool/url');
    xhr.send();

    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
    expect(doneFn).not.toHaveBeenCalled();

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: 200,
      contentType: 'text/plain',
      responseText: 'awesome response',
    });

    expect(doneFn).toHaveBeenCalledWith('awesome response');
  });

  it('allows responses to be setup ahead of time', () => {
    const doneFn = jasmine.createSpy('success');

    jasmine.Ajax.stubRequest('/another/url').andReturn({
      responseText: 'immediate response',
    });

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        doneFn(xhr.responseText);
      }
    };

    xhr.open('GET', '/another/url');
    xhr.send();

    expect(doneFn).toHaveBeenCalledWith('immediate response');
  });
});
