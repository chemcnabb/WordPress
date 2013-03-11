'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', [
    'ui'
]);

// initialize routes
azureTicketsApp
        .config([
                '$routeProvider',
                function($routeProvider) {
                    $routeProvider
                            .when('/admin', {
                                templateUrl : 'views/admin.html',
                                controller : adminController
                            })
                            .when(
                                    '/auth/logoff',
                                    {
                                        controller : adminController,
                                        templateUrl : 'views/admin.html',
                                        resolve : {
                                            logoff : [
                                                    'authService',
                                                    '$rootScope',
                                                    '$location',
                                                    function(authService,
                                                            $rootScope,
                                                            $location) {
                                                        authService
                                                                .logoffAsync()
                                                                .then(
                                                                        function() {
                                                                            authService
                                                                                    .setDomainProfile(null);
                                                                            $location
                                                                                    .path('/admin');

                                                                        });
                                                    }
                                            ]
                                        }
                                    }).when('/front', {
                                templateUrl : 'views/front.html',
                                controller : frontController
                            }).otherwise({
                                redirectTo : '/'
                            }).when('/admin/store', {
                                templateUrl : 'views/store.html',
                                controller : storeController
                            }).when('/admin/venue', {
                                templateUrl : 'views/venue.html',
                                controller : venueController
                            }).when('/admin/event', {
                                templateUrl : 'views/event.html',
                                controller : eventController
                            }).when('/admin/scanner', {
                                templateUrl : 'views/scanner.html',
                                controller : scannerController
                            }).when('/admin/order', {
                                templateUrl : 'views/order.html',
                                controller : orderController
                            });
                }
        ]);
