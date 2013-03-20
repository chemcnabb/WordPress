function storeController($scope, $cookieStore, $timeout, configService,
    authService, permService, storeService, modelService, errorService,
    geoService, formService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
      $scope.config = configService, $scope.name = 'store', $scope.stores = [],
      $scope.currencies = [], $scope.paymentProviders = [],
      $scope.wizard = formService.getWizard($scope);

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
              if (authService.hasStoreAccess()) {
                storeService
                    .listStoresAsync($scope.storeKey, 1)
                    .then(
                        function() {
                          $scope.stores = storeService.getStores();
                          var storesLoaded = !configService.multipleStores
                              && angular.isDefined($scope.stores[0])
                              && $scope.stores[0].Key !== null;

                          if (storesLoaded || $scope.storeKey !== null) {
                            storeService
                                .initStore(
                                    storesLoaded ? $scope.stores[0].Key
                                        : $scope.storeKey)
                                .then(
                                    function(store, currency) {
                                      $cookieStore.put('storeKey', store.Key);
                                      $scope.Store = store;
                                      $scope.Store.tmpPaymentProvider = angular
                                          .isArray($scope.Store.PaymentProviders) ? $scope.Store.PaymentProviders[0].ProviderType
                                          : null;
                                      $scope.wizard.currentStep = 1;

                                      if ($scope.Store.Address
                                          && $scope.Store.Address.Country !== null) {
                                        // we've got a country, alert address
                                        // widget. somehow we should delay this
                                        // a bit in order to properly broadcast
                                        // msg
                                        $timeout(function() {
                                          $scope.$apply(function() {
                                            $scope.$broadcast('loadCountry',
                                                $scope.Store.Address);
                                          })
                                        }, 500);
                                      }

                                      if ($scope.Store.Currency
                                          && $scope.Store.Currency !== null) {
                                        $scope
                                            .loadPaymentProvidersByCurrency($scope.Store.Currency);
                                      }
                                    }, function(err) {
                                      errorService.log(err)
                                    });
                          } else {
                            // create store
                            $('#serviceAgreement').modal('show');

                            // initialize props
                            $scope.Store.Address = modelService
                                .getInstanceOf('Address');
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

  $scope.initStore = function(storeKey) {
    // reload full model
    storeService
        .initStore(storeKey)
        .then(
            function(store, currency) {
              $cookieStore.put('storeKey', store.Key);
              $scope.Store = store;
              $scope.Store.tmpPaymentProvider = $scope.Store.PaymentProviders[0].ProviderType;
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

  $scope.loadPaymentProvidersByCurrency = function(currency) {
    if (angular.isDefined(currency) && currency !== '') {
      storeService.getPaymentProvidersByCurrency(currency).then(
          function(paypros) {
            $scope.paymentProviders = paypros;
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  /**
   * The Payment Providers list returned by above method doesn't include
   * PaymentProvider model (Key, etc), instead it does only return array of
   * strings so we cannot match them against the selection contained in
   * $scope.Store.PaymentProviders
   */
  $scope.isPaymentProviderSelected = function(pType) {
    if (angular.isDefined($scope.Store.PaymentProviders)
        && $scope.Store.PaymentProviders !== null) {
      $scope.Store.PaymentProviders.forEach(function(p) {
        if (p.ProviderType === pType) {
          return true;
        }
      });
    }
    return false;
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Store.Key === null) {
        // create store
        var permaLink = top.location.hostname;

        // check URI
        storeService.checkURIAvailability(permaLink).then(function(uri) {
          // go on and create
          storeService.createStore({
            Name : $scope.Store.Name,
            Description : $scope.Store.Description,
            Public : true,
            HasMemberships : true,
            HasWishlist : true,
            Currency : $scope.Store.Currency,
            StoreURIs : [
              {
                URI : uri
              }
            ],
            Address : $scope.Store.Address
          }).then(function(storeKey) {
            $scope.Store.Key = storeKey;

            // attach payment providers
            storeService.addPaymentProvider($scope.Store, {
              ProviderType : $scope.Store.tmpPaymentProvider
            }).then(function() {
              $scope.wizard.saved = true;

              // reload full model
              $scope.initStore(storeKey);
            }, function(err) {
              errorService.log(err)
            });
          }, function(err) {
            errorService.log(err)
          });
        }, function(err) {
          errorService.log(err)
        });
      } else {
        // update store
        var _finishes = function(ret) {
          // attach payment providers
          storeService.removePaymentProvider($scope.Store, 0).then(function() {
            storeService.addPaymentProvider($scope.Store, {
              ProviderType : $scope.Store.tmpPaymentProvider
            }).then(function() {
              $scope.wizard.saved = true;

              // reload full model
              $scope.initStore($scope.Store.Key);
            }, function(err) {
              errorService.log(err)
            });
          }, function(err) {
            errorService.log(err)
          });
        }

        // update store & address
        if ($scope.Store.Address.Key !== null) {
          storeService.updateStore($scope.Store).then(
              function(store) {
                geoService.updateAddress($scope.Store.Address).then(_finishes,
                    function(err) {
                      errorService.log(err)
                    });
              });
        } else {
          // update store & create address
          storeService.updateStore($scope.Store).then(
              function(store) {
                geoService.createAddressForStore(store.Key,
                    $scope.Store.Address).then(_finishes, function(err) {
                  errorService.log(err)
                });
              });
        }
      }
    }
  }
}

storeController.$inject = [
    '$scope', '$cookieStore', '$timeout', 'configService', 'authService',
    'permService', 'storeService', 'modelService', 'errorService',
    'geoService', 'formService'
];