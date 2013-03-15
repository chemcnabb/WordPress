function venueController($scope, $cookieStore, configService, authService,
    permService, modelService, geoService, placeService, errorService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
      $scope.config = configService, $scope.name = 'venue', $scope.venues = [],
      $scope.countries = [], $scope.regions = [], $scope.timezones = [],
      $scope.wizard = {
        open : false,
        currentStep : 0,
        finished : false,
        saved : false
      };
  ;

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
    authService.authenticate($scope).then(function() {
      if (authService.hasStoreAccess()) {
        placeService.listPlacesAsync($scope.storeKey, 0).then(function() {
          $scope.venues = placeService.getPlaces();
        }, function(err) {
          errorService.log(err)
        });
      }
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

  $scope.loadCitiesByRegion = function(countryIso, regionIso) {
    if (angular.isDefined(countryIso) && angular.isDefined(regionIso)) {
      geoService.getCitiesByRegion(countryIso, regionIso).then(
          function(cities) {
            $scope.cities = cities;
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
              $scope.Place.Address.City = city.CityName;
              $scope.Place.Address.Region = city.Region.ISO;
            }
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
          Name : $scope.Place.Name,
          Description : $scope.Place.Description,
          Address : $scope.Place.Address
        }).then(function(placeKey) {
          $scope.wizard.currentStep = 3;
          $scope.wizard.saved = true;

          $scope.Place.Key = $scope.Place;
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

                // reload full model
                $scope.initPlace(place.Key);
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
    'modelService', 'geoService', 'placeService', 'errorService'
];