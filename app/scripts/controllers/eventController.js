function eventController($scope, $cookieStore, configService, authService,
    permService, modelService, eventService, placeService, geoService,
    errorService, formService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
      $scope.config = configService, $scope.name = 'event', $scope.events = [],
      $scope.venues = [], $scope.wizard = formService.getWizard($scope);

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formEvent').modal({
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
  $scope.Event = modelService.getInstanceOf('Event');

  $scope.init = function() {
    authService.authenticate($scope).then(
        function() {
          if (authService.hasStoreAccess()) {
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

  $scope.loadVenues = function() {
    placeService.listPlacesAsync($scope.storeKey, 0).then(function(venues) {
      $scope.venues = placeService.getPlaces();
    }, function(err) {
      errorService.log(err)
    });
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