function adminController ($scope, configService, authService, permService) {
    $scope.config = configService, $scope.authProviders = [],
            $scope.name = 'admin', $scope.loginErr = null;

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();
    $scope.AccountProfile = authService.getAccountProfile();

    $scope.init = function () {
        $scope.loginErr = null;

        authService.loadProfileAsync(configService.clientKey, function () {
            $scope.DomainProfile = authService.getDomainProfile();

            if (!$scope.$$phase)
                $scope.$apply()
        }, function (err) {

        });
    }

    $scope.loadAuthProviders = function () {
        authService.loadAuthProviders(function (providers) {
            $scope.authProviders = providers;

            if (!$scope.$$phase)
                $scope.$apply()
        })
    }

    $scope.login = function (provider) {
        if (angular.isDefined(provider) && angular.isString(provider)) {
            // login by provider
            authService.logonByProviderAsync(provider, function () {
                $scope.DomainProfile = authService.getDomainProfile();

                if (!$scope.$$phase)
                    $scope.$apply()
            }, function (err) {
                $scope.loginErr = err;

                if (!$scope.$$phase)
                    $scope.$apply()
            });
        } else {
            // login by membership
            authService.logonAsync({
                Email : $scope.AccountProfile.Email,
                PasswordHash : BWL.oAuth
                        .HashPassword($scope.AccountProfile.PasswordHash)
            }, function () {
                $scope.DomainProfile = authService.getDomainProfile();

                if (!$scope.$$phase)
                    $scope.$apply()
            }, function (err) {
                $scope.loginErr = err;

                if (!$scope.$$phase)
                    $scope.$apply()
            });
        }
    }
}

adminController.$inject = ['$scope', 'configService', 'authService',
        'permService'];