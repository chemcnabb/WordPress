function storeController ($scope, configService, authService, storeService) {
    $scope.config = configService, $scope.name = 'store';

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.AccountProfile = authService.getProfile();
    $scope.Store = storeService.getStore();

    $scope.init = function () {
        storeService.listStoresAsync(1, function () {
            $scope.Store = storeService.getStore();

            if (!$scope.$$phase)
                $scope.$apply()
        }, function (err) {

        });
    }
}

storeController.$inject = ['$scope', 'configService', 'authService',
        'storeService'];