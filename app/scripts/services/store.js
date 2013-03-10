// store service
azureTicketsApp.factory('storeService', [
        '$q',
        '$rootScope',
        function($q, $rootScope) {
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
                    return BWL.Store || angular.copy(BWL.Model['Store']);
                },
                initStore : function(storeKey) {
                    var def = $q.defer();

                    BWL.Services.ModelService.ReadAsync(storeKey, "Store",
                            storeKey, 10, function(store) {
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
                }
            }
        }
]);