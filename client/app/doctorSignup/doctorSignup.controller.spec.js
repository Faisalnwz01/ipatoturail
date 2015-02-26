'use strict';

describe('Controller: DoctorSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var DoctorSignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoctorSignupCtrl = $controller('DoctorSignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
