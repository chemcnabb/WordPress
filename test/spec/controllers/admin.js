'use strict';

describe('Controller: adminController', function () {

  // load the controller's module
  beforeEach(module('azureticketsApp'));

  var adminController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    adminController = $controller('adminController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(adminController).toBeDefined();
  });
});
