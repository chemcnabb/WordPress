'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', [
    'ui', 'ngCookies'
]);

/**
 * Apply additional logic on any route request. Order is important.
 * 
 * @property {array} routeFilters
 */
var routeFilters = {
  rememberUrl : [
      '$location', '$cookieStore', 'configService',
      function($location, $cookieStore, configService) {
        if ($location.$$path !== '/auth/login') {
          $cookieStore.put(configService.cookies.lastPath, $location.$$path);
        }
      }
  ],
  redirectLogin : [
      '$location', '$cookieStore', 'authService', 'configService',
      function($location, $cookieStore, authService, configService) {
        var lc = $cookieStore.get(configService.cookies.loggedStatus);

        if ((lc === null || !lc) && $location.$$path !== '/auth/login') {
          $location.path('/auth/login');
        }
      }
  ]
}

// initialize routes
azureTicketsApp.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/admin', {
        templateUrl : 'views/admin.html',
        controller : adminController,
        resolve : routeFilters
      }).when('/auth/login', {
        controller : adminController,
        templateUrl : 'views/auth.html',
        resolve : routeFilters
      }).when(
          '/auth/logoff',
          {
            controller : adminController,
            templateUrl : 'views/auth.html',
            resolve : {
              logoff : [
                  'authService',
                  '$rootScope',
                  '$location',
                  '$cookieStore',
                  'configService',
                  function(authService, $rootScope, $location, $cookieStore,
                      configService) {
                    authService.logoffAsync().then(function() {
                      $cookieStore.remove(configService.cookies.loggedStatus);
                      $cookieStore.remove(configService.cookies.lastPath);

                      authService.setDomainProfile(null);
                      $location.path('/admin');
                    });
                  }
              ]
            }
          }).when('/front', {
        templateUrl : 'views/front.html',
        controller : frontController,
        resolve : routeFilters
      }).otherwise({
        redirectTo : '/'
      }).when('/admin/store', {
        templateUrl : 'views/store.html',
        controller : storeController,
        resolve : routeFilters
      }).when('/admin/venue', {
        templateUrl : 'views/venue.html',
        controller : venueController,
        resolve : routeFilters
      }).when('/admin/event', {
        templateUrl : 'views/event.html',
        controller : eventController,
        resolve : routeFilters
      }).when('/admin/scanner', {
        templateUrl : 'views/scanner.html',
        controller : scannerController,
        resolve : routeFilters
      }).when('/admin/order', {
        templateUrl : 'views/order.html',
        controller : orderController,
        resolve : routeFilters
      });
    }
]);
