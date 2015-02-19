'use strict';

describe('Controller: ChildInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('babyDoctorApp'));

  var ChildInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChildInfoCtrl = $controller('ChildInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
