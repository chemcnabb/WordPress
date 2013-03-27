function eventController($scope, $cookieStore) {
  $scope.name = 'event';

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formEvent').modal({
        show : true,
        backdrop : 'static'
      });
    }
  })

  $scope.init = function() {
    if ($scope.events.length === 0){$scope.event.loadEvents($scope);}
  }

  $scope.update = function(event) {
    $scope.Event = event;
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1
  }

  $scope.create = function() {
    $scope.Event = $scope.model.getInstanceOf('Event');
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1;
  }

  $scope.deleteEvent = function(event) {
    $scope.event.deleteEvent($scope.storeKey, event.Key).then(function() {
      $scope.init();
    }, function(err) {
      $scope.error.log(err)
    });
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Event.Key === null) {
        // go on and create
        $scope.event.createEvent($scope.storeKey, {
          Public : true,
          Name : $scope.Event.Name,
          Description : $scope.Event.Description,
          Places : $scope.Event.tmpVenues.filter(Boolean).map(function(v) {
            return {
              Key : v
            }
          }),
          StartTime : $scope.Event.StartTime,
          EndTime : $scope.Event.EndTime,
          OnSaleDateTimeStart : $scope.Event.OnSaleDateTimeStart,
          OnSaleDateTimeEnd : $scope.Event.OnSaleDateTimeEnd
        }).then(function(eventKey) {
          $scope.wizard.currentStep = 4;
          $scope.wizard.saved = true;

          // reload list
          $scope.init();
        }, function(err) {
          $scope.error.log(err)
        });
      } else {
        // update event
        $scope.event.updateEvent($scope.storeKey, $scope.Event).then(
            function(event) {
              $scope.wizard.currentStep = 4;
              $scope.wizard.saved = true;

              // reload list
              $scope.init();
            }, function(err) {
              $scope.error.log(err)
            });
      }
    }
  }
}

eventController.$inject = [
    '$scope', '$cookieStore'
];