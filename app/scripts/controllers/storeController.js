function storeController ($scope, configService, authService, permService,
        storeService) {
    $scope.config = configService, $scope.name = 'store', $scope.stores = [];

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();
    $scope.Store = storeService.getStore();

    $scope.init = function () {
        authService.authenticate($scope, function () {
            storeService.listStoresAsync(1, function (s) {
                $scope.stores = storeService.getStores();

                if (storeService.hasStore()) {
                    // @todo Justin, is client able to set multiple stores?
                    // DomainProfile should have new boolean prop?
                    if (!configService.multipleStores
                            && $scope.stores[0].Key !== null) {
                        storeService.initStore($scope.stores[0].Key, function (
                                store) {
                            $scope.Store = store;

                            if (!$scope.$$phase)
                                $scope.$apply()
                        });
                    }
                } else {
                    // no store, proceed to create wizard

                }
            }, function (err) {

            });
        });
    }
}

storeController.$inject = ['$scope', 'configService', 'authService',
        'permService', 'storeService'];