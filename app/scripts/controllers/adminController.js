function adminController ($scope, configService) {
	$scope.config = configService;
	$scope.name = 'admin';

	$scope.init = function () {
		
	}
}

adminController.$inject = [ '$scope', 'configService' ];