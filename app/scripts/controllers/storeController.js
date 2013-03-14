function storeController($scope, $q, configService, authService, permService,
    storeService, modelService, errorService, geoService) {
  $scope.config = configService, $scope.name = 'store', $scope.stores = [],
      $scope.currencies = [], $scope.countries = [], $scope.regions = [],
      $scope.paymentProviders = [], $scope.timezones = [], $scope.wizard = {
        currentStep : 0,
        finished : false,
        saved : false
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
              var storeAccess = authService.isMember()
                  || authService.isExplicit() || authService.isStoreOwner()
                  || authService.isEmployee() || authService.isService()
                  || authService.isAdministrator();

              if (storeAccess) {
                storeService
                    .listStoresAsync(1)
                    .then(
                        function() {
                          $scope.stores = storeService.getStores();

                          if (!configService.multipleStores
                              && angular.isDefined($scope.stores[0])
                              && $scope.stores[0].Key !== null) {
                            storeService
                                .initStore($scope.stores[0].Key)
                                .then(
                                    function(store, currency) {
                                      $scope.Store = store;
                                      $scope.Store.tmpPaymentProvider = angular
                                          .isArray($scope.Store.PaymentProviders) ? $scope.Store.PaymentProviders[0].ProviderType
                                          : null;
                                      $scope.wizard.currentStep = 1;

                                      if ($scope.Store.Address
                                          && $scope.Store.Address.Country !== null) {
                                        $scope
                                            .loadRegionsByCountry($scope.Store.Address.Country);
                                        $scope
                                            .loadTimezonesByCountry($scope.Store.Address.Country);
                                      }
                                      if ($scope.Store.Currency
                                          && $scope.Store.Currency !== null) {
                                        $scope
                                            .loadPaymentProvidersByCurrency($scope.Store.Currency);
                                      }
                                    }, function(err) {
                                      errorService.log(err)
                                    });
                          } else if (authService.isAuthenticated()) {
                            // create store
                            $('#serviceAgreement').modal('show')
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

  $scope.initStore = function(storeKey) {
    // reload full model
    storeService
        .initStore(storeKey)
        .then(
            function(store, currency) {
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

  $scope.loadCountries = function() {
    geoService.getCountries().then(function(countries) {
      $scope.countries = countries;
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.loadTimezonesByCountry = function(countryIso) {
    if (angular.isDefined(countryIso)) {
      geoService.getTimezonesByCountry(countryIso).then(function(timezones) {
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
              $scope.initStore(store.Key);
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
        storeService.updateStore($scope.Store).then(function(store) {
          geoService.updateAddress(store.Address).then(function(ret) {
            // attach payment providers
            storeService.removePaymentProvider(store, 0).then(function() {
              storeService.addPaymentProvider(store, {
                ProviderType : store.tmpPaymentProvider
              }).then(function() {
                $scope.wizard.currentStep = 4;
                $scope.wizard.saved = true;

                // reload full model
                $scope.initStore(store.Key);
              }, function(err) {
                errorService.log(err)
              });
            }, function(err) {
              errorService.log(err)
            });
          }, function(err) {
            errorService.log(err)
          });
        });
      }
    }
  }
}

storeController.$inject = [
    '$scope', '$q', 'configService', 'authService', 'permService',
    'storeService', 'modelService', 'errorService', 'geoService'
];