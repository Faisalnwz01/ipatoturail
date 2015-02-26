'use strict';

describe('Controller: DoctorLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var DoctorLoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoctorLoginCtrl = $controller('DoctorLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
