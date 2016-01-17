describe("helloService", function() {
    beforeEach(module('countriesCapitalsApp'));


    it('should return "hello" when called', inject(function(helloService) {
	    expect(helloService()).toBe("hello");
	}));
});