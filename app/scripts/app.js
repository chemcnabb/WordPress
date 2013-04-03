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
      '$rootScope',
      '$location',
      '$cookieStore',
      'authService',
      'configService',
      function($rootScope, $location, $cookieStore, authService, configService) {
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
                  '$timeout',
                  '$location',
                  '$cookieStore',
                  'configService',
                  function(authService, $rootScope, $timeout, $location,
                      $cookieStore, configService) {
                    authService.logoffAsync().then(function() {
                      $cookieStore.remove(configService.cookies.loggedStatus);
                      $cookieStore.remove(configService.cookies.lastPath);
                      authService.setDomainProfile(null);
                      $rootScope.$broadcast('initStore', null);
                      $rootScope.$broadcast('resetDomainProfile');

                      $timeout(function() {
                        $rootScope.$apply(function() {
                          $location.path('/admin');
                        })
                      }, 250)
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
        resolve : routeFilters
      }).when('/admin/venue', {
        templateUrl : 'views/venue.html',
        controller : venueController,
        resolve : routeFilters
      }).when('/admin/event', {
        templateUrl : 'views/event.html',
        controller : eventController,
        resolve : routeFilters
      }).when('/admin/ticket/:eventKey', {
        templateUrl : 'views/ticket.html',
        controller : ticketController,
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
