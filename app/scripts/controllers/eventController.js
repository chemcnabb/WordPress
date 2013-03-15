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
    authService.authenticate($scope).then(function() {
      if (authService.hasStoreAccess()) {
        eventService.listEventsAsync($scope.storeKey, 0).then(function() {
          $scope.events = eventService.getEvents();
        }, function(err) {
          errorService.log(err)
        });
      }
    }, function(err) {
      errorService.log(err)
    });
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.Event.Key === null) {
        // go on and create
        eventService.createEvent({
          Name : $scope.Event.Name,
          Description : $scope.Event.Description,
          Address : $scope.Event.Address
        }).then(function(eventKey) {
          $scope.wizard.currentStep = 3;
          $scope.wizard.saved = true;

          $scope.Event.Key = $scope.Event;
        }, function(err) {
          errorService.log(err)
        });
      } else {
        // update event
        eventService.updateEvent($scope.Event).then(function(event) {
          geoService.updateAddress(event.Address).then(function(ret) {
            $scope.wizard.currentStep = 3;
            $scope.wizard.saved = true;

            // reload full model
            $scope.initEvent(event.Key);
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