function adminController($scope, configService, authService, permService) {
    $scope.config = configService, $scope.authProviders = [],
            $scope.name = 'admin', $scope.loginErr = null, $scope.registerErr = null, $scope.registerMsg = null;

    /**
    * models in play here.
    * 
    * @todo inject models, using array of strings maybe.
    */
    $scope.DomainProfile = authService.getDomainProfile();

    // JJHL: not needed to be maintained, this is a temp var
    //$scope.AccountProfile = authService.getAccountProfile();

    // temp objects
    $scope.tmpAccountLogin = { Email: null, Password: null };
    $scope.tmpAccountRegister = { FullName: null, Email: null, Password: null, ConfirmPassword: null };

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
                Email: $scope.tmpAccountLogin.Email,
                PasswordHash: BWL.oAuth
                        .HashPassword($scope.tmpAccountLogin.Password)
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
        // JJHL: I assume that the form will be validated at this point, all required properties look good and validate (email is email, passwords match, etc...)?

        $scope.registerErr = null, $scope.registerMsg = null;

        if ($scope.tmpAccountRegister.Password != $scope.tmpAccountRegister.ConfirmPassword) {
            $scope.registerErr = 'Passwords do not match';
        }

        if ($scope.registerErr != null) {
            // error, show message
            if (!$scope.$$phase)
                $scope.$apply()

        } else {
            // register account
            authService.registerAsync({
                FullName: $scope.tmpAccountRegister.FullName,
                Email: $scope.tmpAccountRegister.Email,
                PasswordHash: BWL.oAuth.HashPassword($scope.tmpAccountRegister.Password)
            }, function () {
                //$scope.DomainProfile = authService.getDomainProfile();

                // JJHL: the register requires validating the email
                // the user should be told to check the email and come back to logon
                $scope.registerMsg = 'Register Done! Check your email (' + $scope.tmpAccountRegister.Email + ') to validate your account, then you can logon.';

                // reset the form
                $scope.tmpAccountRegister = { FullName: null, Email: null, Password: null, ConfirmPassword: null };

                if (!$scope.$$phase)
                    $scope.$apply()
            }, function (err) {
                $scope.registerErr = err;

                if (!$scope.$$phase)
                    $scope.$apply()
            });
        }
    }
}

adminController.$inject = ['$scope', 'configService', 'authService',
        'permService'];