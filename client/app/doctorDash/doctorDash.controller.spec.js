'use strict';

describe('Controller: DoctorDashCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var DoctorDashCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoctorDashCtrl = $controller('DoctorDashCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
