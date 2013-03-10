function adminController ($scope, configService, authService, permService) {
    $scope.config = configService, $scope.authProviders = [],
            $scope.name = 'admin', $scope.loginErr = null,
            $scope.registerErr = null, $scope.registerOk = false,
            $scope.passwdOk = true;

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();
    $scope.AccountProfile = authService.getAccountProfile();
    $scope.RegisterAccountProfile = angular.copy($scope.AccountProfile);

    $scope.init = function () {
        $scope.loginErr = null;
        authService.authenticate($scope);
    }

    $scope.loadAuthProviders = function () {
        authService.loadAuthProviders(function (providers) {
            $scope.authProviders = providers;

            if (!$scope.$$phase)
                $scope.$apply()
        }, function (err) {

        });
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
            // login by account
            authService.logonAsync({
                Email : $scope.AccountProfile.Email,
                PasswordHash : BWL.oAuth
                        .HashPassword($scope.AccountProfile.Password)
            }, function () {
                authService.authenticate($scope);
            }, function (err) {
                $scope.loginErr = err;

                if (!$scope.$$phase)
                    $scope.$apply()
            });
        }
    }

    $scope.register = function () {
        // register account
        if ($scope.passwdOk)
            authService.registerAsync({
                FullName : $scope.RegisterAccountProfile.FullName,
                Email : $scope.RegisterAccountProfile.Email,
                PasswordHash : BWL.oAuth
                        .HashPassword($scope.RegisterAccountProfile.Password)
            }, function () {
                $scope.registerOk = true;

                if (!$scope.$$phase)
                    $scope.$apply()
            }, function (err) {
                $scope.registerErr = err;

                if (!$scope.$$phase)
                    $scope.$apply()
            });

    }

    $scope.validatePasswords = function () {
        $scope.passwdOk = $scope.RegisterAccountProfile.Password === $scope.RegisterAccountProfile.ConfirmPassword;
    }
}

adminController.$inject = ['$scope', 'configService', 'authService',
        'permService'];