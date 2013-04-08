function cartController($scope, $cookieStore, $filter) {
  $scope.name = 'cart';

  $scope.init = function() {
    if ($scope.Store && !$scope.Store.IsOwner) {
      $scope.cart.initCart($scope.storeKey).then(
          function(cart) {
            $scope.cartItems = [], $scope.allItems = [];
            $scope.Cart = cart;

            if (angular.isDefined($scope.Cart.InventoryItems)) {
              // join all events items
              angular.forEach($scope.events, function(ev) {
                if (angular.isDefined(ev.Items)) {
                  $scope.allItems = $scope.allItems.concat(ev.Items);
                }
              });

              // build cart items array to be displayed
              angular.forEach($scope.Cart.InventoryItems, function(item) {
                var _item = $scope.object.grep($scope.allItems, 'Key',
                    item.ItemInfoKey);
                // set tmp array to check for dups
                if (!angular.isDefined($scope._tmpCartItems)) {
                  $scope._tmpCartItems = [];
                }
                // push to tmp
                $scope._tmpCartItems.push(_item);
                debugger
                // check for existing
                var c = $scope.object.count($scope._tmpCartItems, 'Key',
                    _item.Key);

                if (c === 1) {
                  $scope.cartItems.push(_item);
                }

                // update qty
                var k = $scope.object.getIndex($scope.cartItems, 'Key',
                    _item.Key);
                if (k !== -1) {
                  $scope.cartItems[k].Qty = c;
                }
              })
            }
          }, function(err) {
            $scope.error.log(err)
          });
    }
  }

  $scope.addToCart = function(ticket) {
    $scope.cart.addItem($scope.storeKey, ticket.Type, ticket.Key, 1).then(
        function() {
          ticket.added = true;
          $scope.init();
        }, function(err) {
          $scope.error.log(err)
        });
  }
}

cartController.$inject = [
    '$scope', '$cookieStore', '$filter'
];