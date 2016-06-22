describe("suite wide usage", function() {
  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("specifying response when you need it", function() {
    var doneFn = jasmine.createSpy("success");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(args) {
      if (this.readyState == this.DONE) {
        doneFn(this.responseText);
      }
    };

    xhr.open("GET", "/some/cool/url");
    xhr.send();

    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
    expect(doneFn).not.toHaveBeenCalled();

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: 200,
      contentType: 'text/plain',
      responseText: 'awesome response'
    });

    expect(doneFn).toHaveBeenCalledWith('awesome response');
  });

  it("allows responses to be setup ahead of time", function () {
    var doneFn = jasmine.createSpy("success");

    jasmine.Ajax.stubRequest('/another/url').andReturn({
      "responseText": 'immediate response'
    });

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(args) {
      if (this.readyState == this.DONE) {
        doneFn(this.responseText);
      }
    };

    xhr.open("GET", "/another/url");
    xhr.send();

    expect(doneFn).toHaveBeenCalledWith('immediate response');
  });
});
