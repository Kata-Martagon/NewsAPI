/* global describe, it, expect */

describe('createUrl', () => {
  it('should combine Base URL, extensions and queries correctly', () => {
    const query = {
      q: 'brexit',
      'api-key': 123,
    };
    const extensions = ['Search'];
    const baseURL = 'http://www.google.com/';

    expect(window.createUrl(baseURL, extensions, query)).toBe('http://www.google.com/Search?q=brexit&api-key=123');
  });
});
