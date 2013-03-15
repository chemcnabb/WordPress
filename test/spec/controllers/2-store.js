'use strict';

describe('Controller: storeController', function() {
  var ctrl, scope = null;

  // initialize
  beforeEach(function() {
    module('azureTicketsApp');

    inject(function($rootScope, $controller, $cookieStore, authService,
        configService, modelService) {
      scope = $rootScope.$new();

      ctrl = $controller(storeController, {
        $scope : scope,
        authService : authService,
        configService : configService,
        modelService : modelService,
        $cookieStore : $cookieStore
      });
    });
  });

  iit('should initialize properly', function() {
    expect(scope.config).toBeDefined();
    expect(scope.DomainProfile.Key).not.toBeNull();
    expect(scope.Store.Key).toBeNull();
  });

  iit('should be able to check store availability', function() {

  });
});
