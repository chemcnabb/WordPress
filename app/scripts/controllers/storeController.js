function storeController($scope, configService, authService, permService,
        storeService, modelService, errorService, geoService) {
    $scope.config = configService, $scope.name = 'store', $scope.stores = [],
            $scope.currencies = [], $scope.countries = [], $scope.regions = [],
            $scope.paymentProviders = []
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
        authService
                .authenticate($scope)
                .then(
                        function() {
                            var wideAccess = authService.isMember()
                                    || authService.isExplicit()
                                    || authService.isStoreOwner()
                                    || authService.isEmployee()
                                    || authService.isService()
                                    || authService.isAdministrator();

                            if (wideAccess) {
                                storeService
                                        .listStoresAsync(1)
                                        .then(
                                                function() {
                                                    $scope.stores = storeService
                                                            .getStores();

                                                    if (!configService.multipleStores
                                                            && angular
                                                                    .isDefined($scope.stores[0])
                                                            && $scope.stores[0].Key !== null) {
                                                        storeService
                                                                .initStore(
                                                                        $scope.stores[0].Key)
                                                                .then(
                                                                        function(
                                                                                store,
                                                                                currency) {
                                                                            $scope.Store = store;
                                                                            $scope.wizard.currentStep = 1;
                                                                        },
                                                                        function(
                                                                                err) {
                                                                            errorService
                                                                                    .log(err)
                                                                        });
                                                    } else if (authService
                                                            .isAuthenticated()) {
                                                        // create store
                                                        $('#serviceAgreement')
                                                                .modal('show')
                                                    } else {
                                                        $scope.wizard.currentStep = 1;
                                                    }
                                                }, function(err) {
                                                    errorService.log(err)
                                                });
                            } else {
                                $scope.upgradeProfile();
                            }
                        }, function(err) {
                            errorService.log(err)
                        });
    }

    $scope.upgradeProfile = function() {
        authService.upgradeProfile().then(function() {
            return authService.authenticate($scope);
        }).then(function() {
            $scope.wizard.currentStep = 1;
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
        if (angular.isDefined(countryIso)) {
            geoService.getTimezonesByCountry(countryIso).then(
                    function(timezones) {
                        $scope.timezones = timezones;
                    }, function(err) {
                        errorService.log(err)
                    });
        }
    }

    $scope.loadRegionsByCountry = function(countryIso) {
        if (angular.isDefined(countryIso)) {
            geoService.getRegionsByCountry(countryIso).then(function(regions) {
                $scope.regions = regions;
            }, function(err) {
                errorService.log(err)
            });
        }

    }

    $scope.loadPaymentProvidersByCurrency = function(currency) {
        if (angular.isDefined(currency)) {
            storeService.getPaymentProvidersByCurrency(currency).then(
                    function(paypros) {
                        $scope.paymentProviders = paypros;
                    }, function(err) {
                        errorService.log(err)
                    });
        }

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