'use strict';

describe('Controller: ConfirmationPageCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var ConfirmationPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmationPageCtrl = $controller('ConfirmationPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
