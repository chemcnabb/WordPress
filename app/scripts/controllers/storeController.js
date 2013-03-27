function storeController($scope, $cookieStore, $timeout, configService,
    authService, permService, storeService, modelService, errorService,
    geoService, formService, objectService) {
  $scope.storeKey = null, $scope.config = configService, $scope.name = 'store',
      $scope.stores = [], $scope.venues = [], $scope.events = [],
      $scope.currencies = [], $scope.paymentProviders = [],
      $scope.suggestedURLs = [], $scope.wizard = formService.getWizard($scope),
      $scope.geo = geoService;

  $scope.$on('initStore', function(ev, key) {
    if (key === null) {
      // $cookieStore.remove(configService.cookies.storeKey);
      delete $scope.Store;
    } else if (angular.isDefined(key)) {
      $scope.initStore(key, true);
    }
    if (angular.isDefined(ev) && angular.isFunction(ev.stopPropagation)) {
      ev.stopPropagation();
    }
  });

  $scope.$on('resetDomainProfile', function() {
    delete $scope.DomainProfile;
  });

  $scope.$watch('storeKey', function(key, oldKey) {
    if (key === null || oldKey === key) {
      return;
    }

    if (authService.isDomainProfileReady()) {
      $cookieStore.put(configService.cookies.storeKey, key);
      $scope.$emit('initStore', key);
    }
  }, true);

  $scope.$watch('wizard.saved', function(v) {
    if (v) {
      $scope.wizard.checkStep = {}
    }
  })

  $scope.init = function() {
    authService.authenticate($scope).then(function() {
      $scope.DomainProfile = authService.getDomainProfile();

      // check if user has access to a store and populate list if so
      if (authService.hasStoreAccess()) {
        storeService.listStoresAsync(1).then(function() {
          $scope.stores = storeService.getStores();

          // if user has been upgraded but have not yet created a store
          if (!angular.isArray($scope.stores)) {
            $scope.createStore();
          } else {
            // set current store
            $scope.storeKey = $cookieStore.get(configService.cookies.storeKey)

            // init venues
            $scope.$broadcast('initVenue');
          }
        }, function(err) {
          errorService.log(err)
        });
      } else if (authService.isLogged()) {
        $scope.createStore();
      }
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.createStore = function() {
    // initialize props
    $scope.Store = modelService.getInstanceOf('Store');
    $scope.Store.tmpPaymentProvider = modelService
        .getInstanceOf('PaymentProvider');
    $scope.Store.Address = modelService.getInstanceOf('Address');

    // monitor URI
    $scope.initStoreURI();

    // show agreement
    $timeout(function() {
      $scope.$apply(function() {
        $scope.wizard.currentStep = 0;
        jQuery('#serviceAgreement').modal('show');
      })
    }, 500);

  }

  $scope.initStoreURI = function() {
    if (!angular.isDefined($scope.Store) || $scope.Store === null) {
      return;
    }

    $scope.Store.URI = angular.isDefined($scope.Store.URI) ? $scope.Store.URI
        : null, $scope.URIAvailable = true;

    // suggest URIs
    $scope.$watch('Store.URI', function(uri) {
      if (!angular.isDefined($scope.Store) || $scope.Store === null) {
        return;
      }

      var isNew = $scope.Store.Key === null;

      if (isNew && angular.isDefined(uri) && uri !== null
          && uri.length > configService.typeahead.minLength) {
        var re = /[^\a-z\d\-\_]{1,}/gi;
        var sug = $scope.Store.Name !== null ? $scope.Store.Name.replace(re,
            '-').toLowerCase() : null;

        if (sug !== null && $scope.suggestedURLs.indexOf(sug) === -1) {
          storeService.getURISuggestion(sug).then(function(_uri) {
            if ($scope.suggestedURLs.indexOf(_uri) === -1) {
              $scope.suggestedURLs.push(_uri);
            }
          });
        }

        $scope.Store.URI = uri.replace(re, '-').toLowerCase();
        $scope.checkURIAvailability(uri);
      }
    })
  }

  $scope.setStoreKey = function(key) {
    if ($scope.storeKey !== key) {
      $scope.storeKey = key;
    }

    $scope.wizard.reset();

    // manually load location & accounting items
    $timeout(function() {
      $scope.$apply(function() {
        if (angular.isDefined($scope.Store)) {
          $scope.$broadcast('loadCountry', $scope.Store.Address);
          $scope.loadPaymentProvidersByCurrency($scope.Store.Currency);
        } else {
          $scope.initStore($scope.storeKey, true);
        }
      })
    }, 500);
  }

  $scope.initStore = function(storeKey, resetWizard) {
    if (storeKey !== null) {
      storeService
          .initStore(storeKey)
          .then(
              function(store, currency) {
                $scope.Store = store;
                $scope.Store.tmpPaymentProvider = angular
                    .isArray($scope.Store.PaymentProviders) ? $scope.Store.PaymentProviders[0]
                    : null;

                if (resetWizard) {
                  $scope.wizard.reset();
                }

                if ($scope.Store.Address
                    && $scope.Store.Address.Country !== null) {
                  // we've got a country, alert address
                  // widget. somehow we should delay this
                  // a bit in order to properly broadcast
                  // msg
                  $timeout(function() {
                    $scope.$apply(function() {
                      $scope.$broadcast('loadCountry', $scope.Store.Address);
                    })
                  }, 500);
                }

                if ($scope.Store.Currency && $scope.Store.Currency !== null) {
                  $scope.loadPaymentProvidersByCurrency($scope.Store.Currency);
                }

                // monitor URI
                $scope.initStoreURI();
              }, function(err) {
                errorService.log(err)
              });
    }
  }

  $scope.upgradeProfile = function() {
    authService.upgradeProfile().then(function() {
      return authService.authenticate($scope);
    }).then(function() {
      $scope.wizard.reset();
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.loadCurrencies = function() {
    storeService.getCurrencies().then(function(currencies) {
      var c = [
          'CAD', 'USD', 'EUR', 'GBP'
      ];
      $scope.currencies = objectService.prioritizeSort(currencies, c, 'ISO');
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.loadPaymentProvidersByCurrency = function(currency) {
    if (angular.isDefined(currency) && currency !== '') {
      storeService.getPaymentProvidersByCurrency(currency).then(
          function(paypros) {
            $scope.paymentProviders = paypros;

            if ($scope.Store.tmpPaymentProvider !== null) {
              $scope.loadPaymentProviderInfo($scope.Store.tmpPaymentProvider);
            }
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  /**
   * The Payment Providers list returned by
   * $scope.loadPaymentProvidersByCurrency doesn't include PaymentProvider model
   * (Key, etc), instead it does only return array of strings so we cannot match
   * them against the selection contained in $scope.Store.PaymentProviders
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

  $scope.checkURIAvailability = function(uri) {
    if (angular.isDefined(uri)) {
      storeService.getStoreKeyByURI(uri).then(
          function(storeKey) {
            $scope.URIAvailable = angular.isString(storeKey)
                && storeKey.trim() === '';
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  $scope.loadPaymentProviderInfo = function(paymentProvider) {
    if (angular.isDefined(paymentProvider)
        && paymentProvider.ProviderType !== null) {
      storeService.getPaymentProviderInfo(paymentProvider.ProviderType).then(
          function(info) {
            $scope.tmpPaymentProviderInfo = info;
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Store.Key === null) {
        // create store

        // API claims not null properties
        modelService.nonNull($scope.Store.Address);

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
              URI : $scope.Store.URI
            }
          ],
          Address : $scope.Store.Address
        }).then(
            function(storeKey) {
              if (angular.isString(storeKey)) {
                $scope.wizard.checkStep.store = true,
                    $scope.wizard.checkStep.uri = true,
                    $scope.wizard.checkStep.address = true;

                $scope.Store.Key = storeKey;

                modelService.nonNull($scope.Store.tmpPaymentProvider);

                // attach payment providers
                storeService.addPaymentProvider($scope.Store,
                    $scope.Store.tmpPaymentProvider).then(function() {
                  $scope.wizard.checkStep.payment = true;
                  $scope.wizard.saved = true;

                  // reload full model
                  $scope.initStore(storeKey);
                }, function(err) {
                  $scope.wizard.payment = false;

                  errorService.log(err)
                });
              }
            },
            function(err) {
              $scope.wizard.checkStep.store = false,
                  $scope.wizard.checkStep.uri = false,
                  $scope.wizard.checkStep.address = false,
                  $scope.wizard.checkStep.payment = false;
              errorService.log(err)
            });

      } else {
        // update store
        var _finishes = function(ret) {
          $scope.wizard.checkStep.address = true;

          // attach payment providers
          storeService.removePaymentProvider($scope.Store, 0).then(
              function() {
                modelService.nonNull($scope.Store.tmpPaymentProvider);

                storeService.addPaymentProvider($scope.Store,
                    $scope.Store.tmpPaymentProvider).then(function() {
                  $scope.wizard.checkStep.payment = true;

                  $scope.wizard.saved = true;

                  // reload full model
                  $scope.initStore($scope.Store.Key);
                }, function(err) {
                  $scope.wizard.payment = false;

                  errorService.log(err)
                });
              }, function(err) {
                $scope.wizard.payment = false;

                errorService.log(err)
              });
        }

        // update store & address
        if ($scope.Store.Address.Key !== null) {
          storeService.updateStore($scope.Store).then(
              function(store) {
                if (angular.isDefined(store.Key)) {
                  $scope.wizard.checkStep.store = true,
                      $scope.wizard.checkStep.uri = true;

                  geoService.updateAddress($scope.Store.Address).then(
                      _finishes, function(err) {
                        $scope.wizard.address = false;

                        errorService.log(err)
                      });
                }
              },
              function(err) {
                $scope.wizard.checkStep.store = false,
                    $scope.wizard.checkStep.uri = false,
                    $scope.wizard.checkStep.address = false,
                    $scope.wizard.checkStep.payment = false;

                errorService.log(err)
              });
        } else {
          // update store & create address
          storeService.updateStore($scope.Store).then(
              function(store) {
                if (angular.isDefined(store.Key)) {
                  $scope.wizard.checkStep.store = true,
                      $scope.wizard.checkStep.uri = true;

                  geoService.createAddressForStore(store.Key,
                      $scope.Store.Address).then(_finishes, function(err) {
                    $scope.wizard.checkStep.address = false;

                    errorService.log(err)
                  });
                }
              },
              function(err) {
                $scope.wizard.checkStep.store = false,
                    $scope.wizard.checkStep.uri = false,
                    $scope.wizard.checkStep.address = false,
                    $scope.wizard.checkStep.payment = false;

                errorService.log(err)
              });
        }
      }
    }
  }
}

storeController.$inject = [
    '$scope', '$cookieStore', '$timeout', 'configService', 'authService',
    'permService', 'storeService', 'modelService', 'errorService',
    'geoService', 'formService', 'objectService'
];