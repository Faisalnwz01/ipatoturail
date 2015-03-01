'use strict';

describe('Controller: ProfileInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var ProfileInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileInfoCtrl = $controller('ProfileInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
