/* global describe, it, expect, beforeEach, afterEach, jasmine, createUrl,
guardianAPIKey, fetchAPI */

const query = {
  q: 'brexit',
  'api-key': '123',
};
const extensions = ['Search'];
const baseURL = 'http://www.google.com/';

describe('createUrl', () => {
  it('should combine Base URL, extensions and queries correctly', () => {
    expect(window.createUrl(baseURL, extensions, query)).toBe('http://www.google.com/Search?q=brexit&api-key=123');
  });
});

describe('query/URL builder', () => {
  it('should combine Base URL, extensions and queries correctly', () => {
    expect(createUrl(baseURL, extensions, query)).toBe('http://www.google.com/Search?q=brexit&api-key=123');
  });
});
