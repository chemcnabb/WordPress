function eventController($scope, $cookieStore, configService, authService,
    permService, modelService, eventService, errorService) {
  $scope.storeKey = $cookieStore.get('storeKey') || null,
      $scope.config = configService, $scope.name = 'event', $scope.events = [],

      $scope.wizard = {
        open : false,
        currentStep : 0,
        finished : false,
        saved : false
      };
  ;

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
    $scope.wizard.currentStep = 1

    // refresh address dropdowns
    $scope.loadRegionsByCountry($scope.Event.Address.Country);
    $scope.loadTimezonesByCountry($scope.Event.Address.Country);
  }

  $scope.create = function() {
    $scope.Event = modelService.getInstanceOf('Event');
    $scope.wizard.open = true;
    $scope.wizard.saved = false;
    $scope.wizard.currentStep = 1
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Event.Key === null) {
        // go on and create
        eventService.createEvent($scope.storeKey, {
          Name : $scope.Event.Name,
          Description : $scope.Event.Description
        }).then(function(eventKey) {
          $scope.wizard.currentStep = 3;
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
              geoService.updateAddress(event.Address).then(function(ret) {
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

eventController.$inject = [
    '$scope', '$cookieStore', 'configService', 'authService', 'permService',
    'modelService', 'eventService', 'errorService'
];