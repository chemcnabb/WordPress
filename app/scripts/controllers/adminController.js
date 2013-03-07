function adminController ($scope, configService, authService) {
	$scope.config = configService, $scope.authProviders = [];
	$scope.name = 'admin';
	$scope.profile = null;
	
	// models
	$scope.MembershipProfile = angular.copy(BWL.Model['MembershipProfile']);

	$scope.init = function () {
		authService.loadProfileAsync('b31e42d6-9205-417d-a2d9-366abc7d5046',
				function () {
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
				console.log(err)
			});
		} else {
			// login by membership
			console.log($scope.MembershipProfile)
		}
	}

	$scope.logoff = function () {
		authService.logoffAsync(function (_logoff) {
			if (_logoff)
				$scope.profile = null;

			if (!$scope.$$phase)
				$scope.$apply()
		})
	}
}

adminController.$inject = [ '$scope', 'configService', 'authService' ];