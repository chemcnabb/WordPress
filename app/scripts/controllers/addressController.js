function addressController($scope, errorService, geoService, objectService) {
  $scope.countries = [], $scope.continents = [], $scope.regions = [],
      $scope.timezones = [];

  $scope.$on('loadCountry', function(ev, address) {
    $scope.loadCountry(address);
  });

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
            // prepend most used
            var c = [
                'CA', 'US', 'GB'
            ];
            $scope.countries = objectService
                .prioritizeSort(countries, c, 'ISO');
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
    if (angular.isDefined(address) && angular.isDefined(address.Country)) {
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
}

addressController.$inject = [
    '$scope', 'errorService', 'geoService', 'objectService'
];