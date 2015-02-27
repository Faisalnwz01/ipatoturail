'use strict';

describe('Service: catalyze', function () {

  // load the service's module
  beforeEach(module('babyDoctorApp'));

  // instantiate service
  var catalyze;
  beforeEach(inject(function (_catalyze_) {
    catalyze = _catalyze_;
  }));

  it('should do something', function () {
    expect(!!catalyze).toBe(true);
  });

});
