/* global describe, it, expect, beforeEach, afterEach, jasmine, GuardianAPI */

const queryParams = {
  q: 'brexit',
  'api-key': '123',
};
const pathVariables = ['Search'];

describe('buildUrl', () => {
  it('should combine Base URL, pathVariables and queryParams correctly', () => {
    expect(GuardianAPI.TEST.buildUrl(pathVariables, queryParams)).toBe('http://content.guardianapis.com/Search?q=brexit&api-key=123');
  });
});
