function storeController($scope, $cookieStore, configService, authService,
    permService, storeService, modelService, errorService, geoService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
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
                          } else {
                            // create store
                            $('#serviceAgreement').modal('show')
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

  $scope.getCityByPostalCode = function(countryIso, postalCode) {
    if (angular.isDefined(countryIso) && angular.isDefined(postalCode)
        && postalCode !== null && postalCode.trim().length >= 3) {
      geoService.getCityByPostalCode(countryIso, postalCode).then(
          function(city) {
            if (angular.isDefined(city.CityName)
                && angular.isDefined(city.Region)) {
              $scope.Store.Address.City = city.CityName;
              $scope.Store.Address.Region = city.Region.ISO;
            }
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
              $scope.wizard.currentStep = 4;
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
    '$scope', '$cookieStore', 'configService', 'authService', 'permService',
    'storeService', 'modelService', 'errorService', 'geoService'
];