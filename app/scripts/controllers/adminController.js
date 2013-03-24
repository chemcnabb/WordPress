function adminController($scope, $location, configService, authService,
    permService, modelService, errorService, $cookieStore) {
  $scope.config = configService, $scope.authProviders = [],
      $scope.name = 'admin', $scope.loginErr = null, $scope.registerErr = null,
      $scope.registerOk = false, $scope.passwdOk = true;

  /**
   * models in play here.
   * 
   * @todo inject models, using array of strings maybe.
   */
  $scope.AccountProfile = authService.getAccountProfile();
  $scope.RegisterAccountProfile = angular.copy($scope.AccountProfile);

  $scope.$on('resetDomainProfile', function() {
    delete $scope.DomainProfile;
  });

  $scope.loadAuthProviders = function() {
    authService.loadAuthProviders().then(function(providers) {
      $scope.authProviders = providers;
    }, function(err) {
      errorService.log(err);
    });
  }

  $scope.login = function(provider) {
    if (angular.isDefined(provider) && angular.isString(provider)) {
      // login by provider
      authService.logonByProviderAsync(provider).then(function() {
        $scope.DomainProfile = authService.getDomainProfile();
        $location.path($cookieStore.get(configService.cookies.lastPath));
        $cookieStore.put(configService.cookies.loggedStatus, true);

        $scope.init();
      }, function(err) {
        $scope.loginErr = err;
      });
    } else {
      // login by account
      authService.logonAsync({
        Email : $scope.AccountProfile.Email,
        PasswordHash : BWL.oAuth.HashPassword($scope.AccountProfile.Password)
      }).then(function() {
        authService.authenticate($scope);
      }, function(err) {
        $scope.loginErr = err;
      });
    }
  }

  $scope.register = function() {
    // register account
    if ($scope.passwdOk) {
      authService.registerAsync(
          {
            FullName : $scope.RegisterAccountProfile.FullName,
            Email : $scope.RegisterAccountProfile.Email,
            PasswordHash : BWL.oAuth
                .HashPassword($scope.RegisterAccountProfile.Password)
          }).then(function() {
        $scope.registerOk = true;
      }, function(err) {
        $scope.registerErr = err;
      });
    }
  }

  $scope.validatePasswords = function() {
    $scope.passwdOk = $scope.RegisterAccountProfile.Password === $scope.RegisterAccountProfile.ConfirmPassword;
  }
}

adminController.$inject = [
    '$scope', '$location', 'configService', 'authService', 'permService',
    'modelService', 'errorService', '$cookieStore'
];