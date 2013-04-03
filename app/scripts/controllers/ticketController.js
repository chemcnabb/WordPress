function ticketController($scope, $cookieStore, $filter) {
  $scope.name = 'ticket';

  // initialize wizard for GeneralAdmissionTicketItemInfo
  $scope.wizard = $scope.form.getWizard($scope);

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formTicket').modal({
        show : true,
        backdrop : 'static'
      });
    }
  })

  $scope.init = function() {
    $scope.ticket.loadTickets($scope);
  }

  $scope.update = function(_ticket) {
    $scope.GeneralAdmissionTicketItemInfo = angular.copy(_ticket);
    $scope.wizard.open = true;
    $scope.wizard.reset();
  }

  $scope.create = function() {
    $scope.GeneralAdmissionTicketItemInfo = $scope.model
        .getInstanceOf('GeneralAdmissionTicketItemInfo');
    $scope.wizard.open = true;
    $scope.wizard.reset();
  }

  $scope.deleteTicket = function(ticket) {
    if (confirm($filter('t')('Common.Text_RemoveProduct'))) {
      $scope.ticket.deleteTicket($scope.storeKey, ticket.Key).then(function() {
        $scope.init(true);
      }, function(err) {
        $scope.error.log(err)
      });
    }
  }

  $scope.save = function() {
    if ($scope.wizard.finished) {
      $scope.wizard.saved = false;

      if ($scope.GeneralAdmissionTicketItemInfo.Key === null) {
        // go on and create
        $scope.ticket
            .createTicket(
                $scope.storeKey,
                {
                  Public : true,
                  Name : $scope.GeneralAdmissionTicketItemInfo.Name,
                  Policy : $scope.GeneralAdmissionTicketItemInfo.Policy,
                  Price : $scope.GeneralAdmissionTicketItemInfo.Price,
                  MaxPurchaseQuantity : $scope.GeneralAdmissionTicketItemInfo.MaxPurchaseQuantity,
                  OnSaleDateTimeStart : $scope.GeneralAdmissionTicketItemInfo.OnSaleDateTimeStart,
                  OnSaleDateTimeEnd : $scope.GeneralAdmissionTicketItemInfo.OnSaleDateTimeEnd
                }).then(function(ticketKey) {
              $scope.wizard.saved = true;

              // reload list
              $scope.init();
            }, function(err) {
              $scope.error.log(err)
            });
      } else {
        // update ticket
        var _finishes = function() {
          $scope.wizard.saved = true;
          $scope.init(true);
        }

        $scope.ticket.updateTicket($scope.storeKey,
            $scope.GeneralAdmissionTicketItemInfo).then(_finishes,
            function(err) {
              $scope.error.log(err)
            });
      }
    }
  }
}

ticketController.$inject = [
    '$scope', '$cookieStore', '$filter'
];