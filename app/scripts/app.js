'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', []);

// routes
azureTicketsApp.config([ '$routeProvider', function ($routeProvider) {
	$routeProvider.when('/admin', {
		templateUrl : 'views/admin.html',
		controller : 'adminController'
	}).when('/front', {
		templateUrl : 'views/front.html',
		controller : 'frontController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);

// services
azureTicketsApp.factory('configService', function () {
	return {
		appName : '<%= at.name %>'
	}
});

azureTicketsApp.factory('apiService', function () {

});

// filters
azureTicketsApp.filter('t', function ($window) {

	/**
	 * Custom locale/translation service
	 * 
	 * @method t
	 * @param {string}
	 *            Value to translate
	 */
	return function (t) {
		if (!angular.isDefined(t)) {
			return t;
		}
		var tt = t.split('.');
		var r = tt[0] + 'Resources';

		return angular.isDefined($window[r][tt[1]]) ? eval(r + '.' + tt[1]) : t;
	};
});