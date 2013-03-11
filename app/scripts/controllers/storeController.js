function storeController($scope, configService, authService, permService,
        storeService, modelService, errorService, geoService) {
    $scope.config = configService, $scope.name = 'store', $scope.stores = [],
            $scope.currencies = [], $scope.countries = [],
            $scope.timezones = [], $scope.wizard = {
                currentStep : 0,
                finished : false
            };

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();
    $scope.Store = modelService.getInstanceOf('Store');

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
                                // prop which would define this?
                                if (!configService.multipleStores
                                        && angular.isDefined($scope.stores[0])
                                        && $scope.stores[0].Key !== null) {
                                    storeService
                                            .initStore($scope.stores[0].Key)
                                            .then(function(store, currency) {
                                                $scope.Store = store;

                                                $scope.wizard.currentStep = 1;
                                            }, function(err) {
                                                errorService.log(err)
                                            });
                                } else {
                                    // create store
                                    $('#serviceAgreement').modal('show')
                                }

                            }, function(err) {
                                errorService.log(err)
                            });
                }, function(err) {
                    errorService.log(err)
                });
    }

    $scope.loadCurrencies = function() {
        storeService.getCurrencies().then(function(currencies) {
            $scope.currencies = currencies;
        }, function(err) {
            errorService.log(err)
        });
    }

    $scope.loadCountries = function() {
        geoService.getCountries().then(function(countries) {
            $scope.countries = countries;
        }, function(err) {
            errorService.log(err)
        });
    }

    $scope.loadTimezonesByCountry = function(countryIso) {
        geoService.getTimezonesByCountry(countryIso).then(function(timezones) {
            $scope.timezones = timezones;
        }, function(err) {
            errorService.log(err)
        });
    }

    $scope.save = function() {
        console.log($scope.Store)
        if ($scope.wizardOk) {

        }
    }
}

storeController.$inject = [
        '$scope', 'configService', 'authService', 'permService',
        'storeService', 'modelService', 'errorService', 'geoService'
];