function venueController($scope, configService, authService, permService,
    modelService, geoService) {
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
  $scope.Venue = modelService.getInstanceOf('Place');

  $scope.init = function() {
    authService.authenticate($scope).then(function() {

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
}

venueController.$inject = [
    '$scope', 'configService', 'authService', 'permService', 'modelService',
    'geoService'
];