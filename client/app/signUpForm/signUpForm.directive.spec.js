'use strict';

describe('Directive: signUpForm', function () {

  // load the directive's module and view
  beforeEach(module('babyDoctorApp'));
  beforeEach(module('app/signUpForm/signUpForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sign-up-form></sign-up-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signUpForm directive');
  }));
});