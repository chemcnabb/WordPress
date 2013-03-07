function adminController ($scope, configService, authService) {
	$scope.config = configService, $scope.authProviders = [];
	$scope.name = 'admin';
	$scope.loginErr, $scope.profile = null;

	// models
	$scope.AccountProfile = angular.copy(BWL.Model['AccountProfile']);

	$scope.init = function () {
		authService.loadProfileAsync(configService.clientKey, function () {
			$scope.profile = authService.getProfile();

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
				$scope.profile = authService.getProfile();

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
				$scope.profile = authService.getProfile();

				if (!$scope.$$phase)
					$scope.$apply()
			}, function (err) {
				$scope.loginErr = err;

				if (!$scope.$$phase)
					$scope.$apply()
			});
		}
	}

	$scope.logoff = function () {
		authService.logoffAsync(function (_logoff) {
			if (_logoff) {
				$scope.profile = null;
				$scope.loginErr = null;
			}

			if (!$scope.$$phase)
				$scope.$apply()
		})
	}
}

adminController.$inject = [ '$scope', 'configService', 'authService' ];