// store service
azureTicketsApp.factory('storeService', [
        '$q',
        '$rootScope',
        'modelService',
        function($q, $rootScope, modelService) {
            var _stores = null;

            return {
                listStoresAsync : function(levels) {
                    var def = $q.defer();

                    BWL.Services.StoreService.ListStoresAsync(levels, function(
                            stores) {
                        _stores = stores;

                        $rootScope.$apply(function() {
                            def.resolve();
                        });
                    }, function(err) {
                        $rootScope.$apply(function() {
                            def.reject(err)
                        })
                    });

                    return def.promise;
                },
                hasStore : function() {
                    return _stores !== null && angular.isObject(_stores[0])
                            && _stores[0].Key !== null
                },
                getStores : function() {
                    return _stores;
                },
                getStore : function() {
                    return modelService.getInstanceOf('Store');
                },
                initStore : function(storeKey) {
                    var def = $q.defer();

                    BWL.Services.ModelService.ReadAsync(storeKey, "Store",
                            storeKey, 10, function(store) {
                                if (!angular.isDefined(store.Address)) {
                                    store.Address = modelService
                                            .getInstanceOf('Address');
                                }

                                BWL.Services.GeoService.ReadCurrencyAsync(
                                        store.Currency, function(currency) {
                                            $rootScope.$apply(function() {
                                                def.resolve(store, currency)
                                            });
                                        }, function(err) {
                                            $rootScope.$apply(function() {
                                                def.reject(err)
                                            })
                                        });
                            });

                    return def.promise;
                },
                getCurrencies : function() {
                    var def = $q.defer();

                    BWL.Services.GeoService.ListCurrenciesAsync(function(
                            currencies) {
                        $rootScope.$apply(function() {
                            def.resolve(currencies)
                        });
                    }, function(err) {
                        $rootScope.$apply(function() {
                            def.reject(err)
                        })
                    });

                    return def.promise;
                },
                getPaymentProvidersByCurrency : function(currency) {
                    var def = $q.defer();

                    BWL.Services.PaymentService.ListProvidersByCurrencyAsync(
                            currency, function(paypros) {
                                $rootScope.$apply(function() {
                                    def.resolve(paypros)
                                });
                            }, function(err) {
                                $rootScope.$apply(function() {
                                    def.reject(err)
                                })
                            });

                    return def.promise;
                }
            }
        }
]);