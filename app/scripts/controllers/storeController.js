function storeController($scope, configService, authService, permService,
        storeService, modelService) {
    $scope.config = configService, $scope.name = 'store', $scope.stores = [];

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();
    $scope.Store = modelService.getInstanceOf('Store');
    $scope.Currency = modelService.getInstanceOf('Currency');

    $scope.init = function() {
        authService.authenticate($scope).then(
                function() {
                    storeService.listStoresAsync(1).then(
                            function() {
                                $scope.stores = storeService.getStores();

                                if (storeService.hasStore()) {
                                    // @todo Justin, is client able to set
                                    // multiple
                                    // stores?
                                    // DomainProfile should have new boolean
                                    // prop?
                                    if (!configService.multipleStores
                                            && $scope.stores[0].Key !== null) {
                                        storeService.initStore(
                                                $scope.stores[0].Key).then(
                                                function(store, currency) {
                                                    $scope.Store = store;
                                                    $scope.Currency = currency;
                                                }, function(err) {

                                                });
                                    }
                                } else {
                                    // no store, proceed to create wizard

                                }
                            }, function(err) {

                            });
                }, function(err) {

                });
    }
}

storeController.$inject = [
        '$scope', 'configService', 'authService', 'permService',
        'storeService', 'modelService'
];