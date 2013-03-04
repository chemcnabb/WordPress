'use strict';

angular.module('azureticketsApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/admin.html',
        controller: 'adminController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
