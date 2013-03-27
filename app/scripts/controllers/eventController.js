function eventController($scope, $cookieStore, configService, authService,
    permService, modelService, eventService, placeService, geoService,
    errorService, formService) {
  $scope.config = configService, $scope.name = 'event',
      $scope.wizard = formService.getWizard($scope);

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formEvent').modal({
        show : true,
        backdrop : 'static'
      });
    }
  })

  $scope.init = function() {
    $scope.storeKey = $scope.storeKey
        || $cookieStore.get(configService.cookies.storeKey);

    eventService.listEventsAsync($scope.storeKey, 0).then(
        function() {
          $scope.events = eventService.getEvents();

          if ($scope.events.length > 0) {
            angular.forEach($scope.events, function(event, i) {
              eventService.initEvent($scope.storeKey, event.Key).then(
                  function(event) {
                    $scope.events[i] = event;
                  })
            });
          }
        }, function(err) {
          errorService.log(err)
        });
  }

  $scope.update = function(event) {
    $scope.Event = event;
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1
  }

  $scope.create = function() {
    $scope.Event = modelService.getInstanceOf('Event');
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.finished = false;
    $scope.wizard.currentStep = 1;
  }

  $scope.deleteEvent = function(event) {
    eventService.deleteEvent($scope.storeKey, event.Key).then(function() {
      $scope.init();
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Event.Key === null) {
        // go on and create
        eventService.createEvent($scope.storeKey, {
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
          errorService.log(err)
        });
      } else {
        // update event
        eventService.updateEvent($scope.storeKey, $scope.Event).then(
            function(event) {
              $scope.wizard.currentStep = 4;
              $scope.wizard.saved = true;

              // reload list
              $scope.init();
            }, function(err) {
              errorService.log(err)
            });
      }
    }
  }
}

eventController.$inject = [
    '$scope', '$cookieStore', 'configService', 'authService', 'permService',
    'modelService', 'eventService', 'placeService', 'geoService',
    'errorService', 'formService'
];