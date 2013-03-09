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

    iit('should initialize properly', function () {
        expect(scope.config).toBeDefined();
        expect(scope.DomainProfile.Key).toBeNull();
        expect(scope.AccountProfile.Key).toBeNull();
    });

    iit('should be able to retrieve auth providers', function () {
        scope.loadAuthProviders();

        waitsFor(function () {
            return scope.authProviders.length > 0;
        }, 'auth providers not retrieved', 6000);
    });

    iit('should be able to login using test account', function () {
        scope.AccountProfile.Email = 'nfiglesias@gmail.com';
        scope.AccountProfile.PasswordHash = '121212';

        scope.login();

        waitsFor(function () {
            return scope.DomainProfile.Key !== null;
        }, 'cannot login using test account', 6000);
    });
});
