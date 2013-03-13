// store service
azureTicketsApp.factory('storeService', [
    '$q',
    '$rootScope',
    'modelService',
    'configService',
    function($q, $rootScope, modelService, configService) {
      var _stores = [], _lastAvailableURI = null;

      return {
        listStoresAsync : function(levels) {
          var def = $q.defer();

          BWL.Services.StoreService.ListStoresAsync(levels, function(stores) {
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
        /**
         * Find for existent URIs.
         * 
         * @param uri
         *          URI
         * @returns {void}
         */
        getStoreKeyByURI : function(uri) {
          var def = $q.defer();

          BWL.Services.StoreService.FindStoreKeyFromCustomURIAsync(uri,
              function(storeKey) {
                if (!angular.isDefined(storeKey) || storeKey.trim() === '') {
                  _lastAvailableURI = uri;
                }

                $rootScope.$apply(function() {
                  def.resolve(storeKey);
                })
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        checkURIAvailability : function(h, c) {
          var def = $q.defer(), _this = this;

          // check URI availability and regenerate if
          // exists
          c = angular.isDefined(c) ? c++ : 0, maxIt = 20;
          h = c > 0 ? h + String.valueOf(c) : h;

          this.getStoreKeyByURI(h).then(
              function(storeKey) {
                if (angular.isDefined(storeKey) && storeKey !== '') {
                  // existing URI,
                  // generate
                  // extra string
                  if (c < maxIt) {
                    debugger
                    _this.checkURIAvailability(h);
                    return;
                  } else {
                    def.reject(CommonResources.Error_System.replace(/\{\d+\}/g,
                        'maximum iteration achieved'));
                  }
                } else {
                  // URI not found,
                  // proceed to
                  // creation
                  debugger;
                  def.resolve(h);
                }
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        createStore : function(store) {
          var def = $q.defer();

          BWL.Services.ModelService.CreateAsync(configService.container.store,
              this.getStore().Type, store, function(storeKey) {
                debugger;

                $rootScope.$apply(function() {
                  def.resolve(storeKey)
                });
              }, function(err) {
                debugger;
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        initStore : function(storeKey) {
          var def = $q.defer();

          BWL.Services.ModelService
              .ReadAsync(storeKey, "Store", storeKey, 10,
                  function(store) {
                    if (!angular.isDefined(store.Address)
                        || store.Address === null) {
                      store.Address = modelService.getInstanceOf('Address');
                    }

                    BWL.Services.GeoService.ReadCurrencyAsync(store.Currency,
                        function(currency) {
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
        addStoreURI : function(storeKey, uri) {
          var def = $q.defer(), _this = this;

          BWL.Services.ModelService.CreateAsync(storeKey, "StoreURI", {
            URI : uri
          }, function(uriKey) {
            BWL.Services.ModelService.AddAsync(storeKey, "Store", storeKey,
                "StoreURIs", "StoreURI", uriKey, function(ret) {
                  $rootScope.$apply(def.resolve)
                }, function(err) {
                  $rootScope.$apply(function() {
                    def.reject(err)
                  })
                });
          }, function(err) {
            $rootScope.$apply(function() {
              def.reject(err)
            })
          });

          return def.promise;
        },

        getCurrencies : function() {
          var def = $q.defer();

          BWL.Services.GeoService.ListCurrenciesAsync(function(currencies) {
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

          BWL.Services.PaymentService.ListProvidersByCurrencyAsync(currency,
              function(paypros) {
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