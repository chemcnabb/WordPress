function cartController($scope, $cookieStore, $filter) {
  $scope.name = 'cart';

  // initialize wizard for the checkout process
  $scope.wizard = $scope.form.getWizard($scope);

  $scope.$watch('wizard.open', function(v) {
    if (v) {
      $('#formCheckout').modal({
        show : true,
        backdrop : 'static'
      });
    }
  })

  $scope.init = function() {
    if ($scope.Store && !$scope.Store.IsOwner) {
      $scope.cart.initCart($scope.storeKey).then(
          function(cart) {
            $scope.cartItems = [], $scope.allItems = [];
            $scope.Cart = cart;

            if (angular.isDefined($scope.Cart.InventoryItems)) {
              // join all events items
              angular.forEach($scope.events, function(ev) {
                if (angular.isDefined(ev.Items) && angular.isArray(ev.Items)) {
                  $scope.allItems = $scope.allItems.concat(ev.Items);
                }
              });

              // build cart items array to be displayed
              angular.forEach($scope.Cart.InventoryItems, function(item) {
                var _item = $scope.object.grep($scope.allItems, 'Key',
                    item.ItemInfoKey);
                // check for existing
                var k = $scope.object.getIndex($scope.cartItems, 'Key',
                    _item.Key);

                if (k === -1) {
                  _item.Qty = 1;
                  $scope.cartItems.push(_item);
                } else {
                  // update qty
                  $scope.cartItems[k].Qty = $scope.cartItems[k].Qty + 1;
                }

                $scope.Cart.Items = $scope.cartItems;
              })
            }
          }, function(err) {
            $scope.error.log(err)
          });
    }
  }

  $scope.addToCart = function(item) {
    $scope.cart.addItem($scope.storeKey, item.Type, item.Key, 1).then(
        function() {
          item.added = true;
          $scope.init();
        }, function(err) {
          $scope.error.log(err)
        });
  }

  $scope.removeFromCart = function(item) {
    $scope.cart.removeItem($scope.storeKey, item.Type, item.Key, 1).then(
        function() {
          item.added = false;
          $scope.init();
        }, function(err) {
          $scope.error.log(err)
        });
  }
}

cartController.$inject = [
    '$scope', '$cookieStore', '$filter'
];