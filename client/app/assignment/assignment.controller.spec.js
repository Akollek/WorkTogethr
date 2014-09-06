'use strict';

describe('Controller: AssignmentCtrl', function () {

  // load the controller's module
  beforeEach(module('worktogethrApp'));

  var AssignmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentCtrl = $controller('AssignmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
