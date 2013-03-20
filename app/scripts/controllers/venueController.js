function venueController($scope, $cookieStore, configService, authService,
    permService, modelService, geoService, placeService, errorService,
    formService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
      $scope.config = configService, $scope.name = 'venue', $scope.venues = [],
      $scope.countries = [], $scope.regions = [], $scope.timezones = [],
      $scope.wizard = formService.getWizard($scope);

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formVenue').modal({
        show : true,
        backdrop : 'static'
      });
    }
  })

  /**
   * models in play here.
   * 
   * @todo inject models, using array of strings maybe.
   */
  $scope.DomainProfile = authService.getDomainProfile();
  $scope.Place = modelService.getInstanceOf('Place');

  $scope.init = function() {
    authService.authenticate($scope).then(
        function() {
          if (authService.hasStoreAccess()) {
            placeService.listPlacesAsync($scope.storeKey, 0).then(
                function() {
                  $scope.venues = placeService.getPlaces();

                  if ($scope.venues.length > 0) {
                    angular.forEach($scope.venues, function(venue, i) {
                      placeService.initPlace($scope.storeKey, venue.Key).then(
                          function(place) {
                            $scope.venues[i] = place;
                          })
                    });
                  }
                }, function(err) {
                  errorService.log(err)
                });
          }
        }, function(err) {
          errorService.log(err)
        });
  }

  $scope.update = function(venue) {
    $scope.Place = venue;
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1

    // refresh address dropdowns
    $scope.loadRegionsByCountry($scope.Place.Address.Country);
    $scope.loadTimezonesByCountry($scope.Place.Address.Country);
  }

  $scope.create = function() {
    $scope.Place = modelService.getInstanceOf('Place');
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1
  }

  $scope.loadContinents = function() {
    geoService.getContinents().then(function(continents) {
      $scope.continents = continents;
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.loadCountriesByContinent = function(address, reset) {
    if (angular.isDefined(address.tmpContinentIso)) {
      var continentIso = address.tmpContinentIso;

      // reset lists
      $scope.countries = [];
      $scope.regions = [];
      $scope.timezones = [];

      // reset address
      if (reset) {
        $scope.Country = null;
        address.City = null, address.AddressLine1 = null,
            address.AddressLine2 = null, address.Timezone = null,
            address.Region = null, address.PostalCode = null;
      }

      geoService.getCountriesByContinent(continentIso).then(
          function(countries) {
            $scope.countries = countries;
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  $scope.loadTimezonesByCountry = function(address) {
    if (angular.isDefined(address.Country)) {
      geoService.getTimezonesByCountry(address.Country).then(
          function(timezones) {
            $scope.timezones = timezones;
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  $scope.loadCountry = function(address) {
    if (angular.isDefined(address.Country)) {
      geoService.loadCountry(address.Country).then(function(country) {
        $scope.Country = country;
        address.tmpContinentIso = country.ContinentISO;

        if (!country.HasPostalCodes) {
          $scope.loadRegionsByCountry(address)
        }
        if ($scope.countries.length === 0) {
          $scope.loadCountriesByContinent(address)
        }
        if ($scope.timezones.length === 0) {
          $scope.loadTimezonesByCountry(address)
        }
      }, function(err) {
        errorService.log(err)
      });
    }
  }

  $scope.loadRegionsByCountry = function(address) {
    if (angular.isDefined(address.Country)) {
      geoService.getRegionsByCountry(address.Country).then(function(regions) {
        $scope.regions = regions;
      }, function(err) {
        errorService.log(err)
      });
    }
  }

  $scope.getCityByPostalCode = function(address) {
    if (angular.isDefined(address.Country)
        && angular.isDefined(address.PostalCode) && address.PostalCode !== null
        && address.PostalCode.trim().length >= 3) {
      geoService.getCityByPostalCode(address.Country, address.PostalCode).then(
          function(city) {
            // lookup timezone
            geoService.getCityByName(city.CityName, city.RegionISO,
                city.CountryISO).then(
                function(city) {
                  if (angular.isDefined(city.Name)
                      && angular.isDefined(city.RegionISO)) {
                    address.City = city.Name;
                    address.Region = city.RegionISO;
                    address.Timezone = city.TimezoneName;
                    $scope.loadRegionsByCountry(address);
                    $scope.loadTimezonesByCountry(address);
                  }
                }, function(err) {
                  errorService.log(err)
                });
          }, function(err) {
            errorService.log(err)
          });
    }
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Place.Key === null) {
        // go on and create
        placeService.createPlace($scope.storeKey, {
          Public : true,
          Name : $scope.Place.Name,
          Description : $scope.Place.Description,
          Address : $scope.Place.Address
        }).then(function(placeKey) {
          $scope.wizard.currentStep = 3;
          $scope.wizard.saved = true;

          // reload list
          $scope.init();
        }, function(err) {
          errorService.log(err)
        });
      } else {
        // update place
        placeService.updatePlace($scope.storeKey, $scope.Place).then(
            function(place) {
              geoService.updateAddress(place.Address).then(function(ret) {
                $scope.wizard.currentStep = 3;
                $scope.wizard.saved = true;

                // reload list
                $scope.init();
              }, function(err) {
                errorService.log(err)
              });
            });
      }
    }
  }
}

venueController.$inject = [
    '$scope', '$cookieStore', 'configService', 'authService', 'permService',
    'modelService', 'geoService', 'placeService', 'errorService', 'formService'
];