'use strict';

describe('Controller: adminController', function () {
    var ctrl, scope = null;

    // initialize
    beforeEach(function () {
        module('azureTicketsApp');

        inject(function ($rootScope, $controller, authService, configService) {
            scope = $rootScope.$new();

            ctrl = $controller(adminController, {
                $scope : scope,
                authService : authService,
                configService : configService
            });
        });
    });

    it('should initialize properly', function () {
        expect(scope.config).toBeDefined();
        expect(scope.DomainProfile.Key).toBeNull();
    });

    iit('should be able to retrieve auth providers', function () {
        scope.loadAuthProviders();
        
        waitsFor(function () {
            return scope.authProviders.length > 0;
        }, 'auth providers not retrieved', 6000);
    });

});
