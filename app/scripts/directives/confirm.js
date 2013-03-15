azureTicketsApp.directive('ngConfirm', function($window) {
  return function(scope, elem, attrs) {
    elem.bind('click', function() {
      return $window.confirm(attrs['ngConfirm']);
    });
  };
});