'use strict';

describe('Controller: adminController', function () {
    var adminController, $scope = null;

    // load the controller's module
    beforeEach(module('azureTicketsApp'));

    // initialize
    beforeEach(inject(function ($rootScope, $controller, authService) {
        $scope = $rootScope.$new();

        adminController = $controller('adminController', {
            $scope : $scope,
            authService : authService
        });
    }));

    it('should initialize properly', function () {
        expect($scope.config).toBeDefined();
        expect($scope.DomainProfile.Key).toBeNull();
    });

//    it('should be able to retrieve auth providers', function () {
//        $scope.loadAuthProviders();
//
//        waitsFor(function () {
//            return $scope.authProviders.length > 0;
//        }, 'auth providers not retrieved', 6000);
//    });
});
