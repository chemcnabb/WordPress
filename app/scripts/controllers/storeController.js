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
        var _init = function () {
            storeService.listStoresAsync(2, function () {
                $scope.stores = storeService.getStores();

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
            }, function (err) {

            });
        }

        // checks whether profile has been initialized or have to manually do it
        authService.authenticate(function () {
            $scope.DomainProfile = authService.getDomainProfile();
            _init();
        }, function (err) {

        });
    }
}

storeController.$inject = ['$scope', 'configService', 'authService',
        'permService', 'storeService'];