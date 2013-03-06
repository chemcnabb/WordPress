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

azureTicketsApp.factory('authService', function () {
	var _profile = null;
	var _clientKey = null;

	return {
		loadProfileAsync : function (clientKey, cbk, errCbk) {
			BWL.ClientKey = clientKey;
			_clientKey = clientKey;
			BWL.oAuth.LoadProfileAsync(cbk, errCbk);
		},
		logonAsync : function (provider, cbk, errCbk) {
			BWL.oAuth.Init(_clientKey);
			BWL.Services.SystemProfileService.GetProfileAsync(5, function (
					profile) {
				if (profile.DomainProfileId !== 0) {
					_profile = profile;
					cbk();
				} else {
					BWL.oAuth.LogonAsync(provider, cbk, errCbk);
				}
			}, errCbk)
		},
		logoffAsync : function (cbk) {
			BWL.Services.SystemProfileService.LogoffAsync(cbk);
		},
		getProfile : function () {
			return _profile || BWL.Profile;
		},
		loadAuthProviders : function (cbk) {
			BWL.Services.oAuthService.ListAuthProvidersAsync(cbk);
		}
	}
});

// filters
azureTicketsApp.filter('t',
		function ($window) {

			/**
			 * Custom locale/translation filter
			 * 
			 * @todo detect client lang and use the appropiate resources file
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

				return angular.isDefined($window[r][tt[1]]) ? eval(r + '.'
						+ tt[1]) : t;
			};
		});