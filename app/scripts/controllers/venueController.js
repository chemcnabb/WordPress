function venueController($scope, $timeout, $cookieStore) {
  $scope.name = 'venue';

  // initialize wizard for Venue
  $scope.wizard = $scope.form.getWizard($scope);

  // watch for update/create requests
  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formVenue').modal({
        show : true,
        backdrop : 'static'
      });
    }
  });

  $scope.$watch('wizard.saved', function(v) {
    if (v) {
      $scope.wizard.checkStep = {}
    }
  })

  /**
   * @param force
   *          true to force reload
   */
  $scope.init = function(force) {
    if (force || $scope.venues.length === 0) {
      $scope.place.loadPlaces($scope);
    }
  }

  $scope.update = function(venue) {
    $scope.Place = venue;
    $scope.wizard.open = true;
    $scope.wizard.reset();

    // manually load location
    $timeout(function() {
      $scope.$apply(function() {
        if (angular.isDefined($scope.Store)) {
          $scope.$broadcast('loadCountry', $scope.Place.Address);
        }
      })
    }, 500);
  }

  $scope.create = function() {
    // initialize props
    $scope.Place = $scope.model.getInstanceOf('Place');
    $scope.Place.Address = $scope.model.getInstanceOf('Address');
    $scope.wizard.open = true;
    $scope.wizard.reset();
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Place.Key === null) {
        // create place

        // API claims not null properties
        $scope.model.nonNull($scope.Place.Address);

        var newPlace = {
          Public : true,
          Name : $scope.Place.Name,
          Description : $scope.Place.Description,
          Address : $scope.Place.Address
        };

        $scope.place.createPlace($scope.storeKey, newPlace).then(
            function(placeKey) {
              if (angular.isString(placeKey)) {
                $scope.wizard.saved = true;

                // reload list
                $scope.init(true);
              }
            }, function(err) {
              $scope.error.log(err)
            });
      } else {
        // update place
        $scope.place.updatePlace($scope.storeKey, $scope.Place).then(
            function(place) {
              $scope.geo.updateAddress(place.Address).then(function(ret) {
                $scope.wizard.saved = true;

                // reload list
                $scope.init(true);
              }, function(err) {
                $scope.error.log(err)
              });
            });
      }
    }
  }
}

venueController.$inject = [
    '$scope', '$timeout', '$cookieStore'
];