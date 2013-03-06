function adminController ($scope, configService, authService) {
	$scope.config = configService, $scope.authProviders = [];
	$scope.name = 'admin';
	$scope.profile = null;

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
		authService.logonAsync(provider, function () {
			$scope.profile = authService.getProfile();

			if (!$scope.$$phase)
				$scope.$apply()
		}, function (err) {
			console.log(err)
		});
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