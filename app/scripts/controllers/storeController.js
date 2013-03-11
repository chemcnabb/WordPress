function storeController($scope, configService, authService, permService,
        storeService, modelService, errorService) {
    $scope.config = configService, $scope.name = 'store', $scope.stores = [],
            $scope.currencies = [], $scope.wizard = {
                currentStep : 'step1',
                finished : false
            };

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

                                // @todo Justin, is client able to set
                                // multiple
                                // stores?
                                // DomainProfile should have new boolean
                                // prop?
                                if (!configService.multipleStores
                                        && angular.isDefined($scope.stores[0])
                                        && $scope.stores[0].Key !== null) {
                                    storeService
                                            .initStore($scope.stores[0].Key)
                                            .then(function(store, currency) {
                                                $scope.Store = store;
                                                $scope.Currency = currency;
                                            }, function(err) {

                                            });
                                }

                            }, function(err) {
                                errorService.log(err)
                            });
                }, function(err) {
                    errorService.log(err)
                });
    }

    $scope.loadCurrencies = function() {
        // populate currencies list
        storeService.getCurrencies().then(function(currencies) {
            $scope.currencies = currencies;
        }, function(err) {
            errorService.log(err)
        });
    }

    $scope.update = function() {
        if ($scope.wizardOk) {

        }
    }
}

storeController.$inject = [
        '$scope', 'configService', 'authService', 'permService',
        'storeService', 'modelService', 'errorService'
];