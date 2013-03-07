'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', [ 'ui' ]);

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
		logonByProviderAsync : function (provider, cbk, errCbk) {
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
azureTicketsApp.filter('t', [
		'$window',
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

				return angular.isDefined($window[r])
						&& angular.isDefined($window[r][tt[1]]) ? eval(r + '.'
						+ tt[1]) : t;
			};
		} ]);

// directives

/**
 * This directive will attach the field to a model applied to the rules defined
 * in modelsmeta.js .
 */
azureTicketsApp.directive('atfield', [
		'$compile',
		function ($compile) {
			return {
				restrict : 'E',
				scope : {
					atModel : '=ngModel',
					atLabel : '=label'
				},
				link : function ($scope, $element, $attrs) {
					var m = $attrs.ngModel.split('.')[0];
					var f = $attrs.ngModel.split('.')[1];
					var fieldType = BWL.ModelMeta[m][f];
					var _el, _label = null;
					var _attr = {
						placeholder : f,
						name : m + '[' + f + ']',
						id : $attrs.ngModel
					};
					var isPass = /Password/g.test(f);

					// set label if defined
					if (angular.isDefined($attrs.label)) {
						_label = jQuery('<label />');
						_label.text('{{atLabel}}');
						if (angular.isDefined($attrs.labelClass))
							_label.addClass($attrs.labelClass);
					}

					// set proper element definition
					if (/^String/g.test(fieldType)) {
						_attr.type = !isPass ? 'text' : 'password',
								_el = jQuery('<input />');
						if (_label !== null)
							_label.addClass('pull-left');

					}
					if (/^Boolean/g.test(fieldType)) {
						_attr.type = 'checkbox', _el = jQuery('<input />');
						if (_label !== null)
							_label.addClass('pull-right');
					}

					// define new element attributes
					for (p in $attrs) {
						if (angular.isString($attrs[p])
								&& [ 'ngModel' ].indexOf(p) === -1)
							_el.attr(p, $attrs[p]);
					}
					for (p in _attr) {
						_el.attr(p, _attr[p]);
					}

					// make new element available
					_el.attr('ng-model', 'atModel');

					if (_label !== null)
						$compile(_label)($scope);
					$compile(_el)($scope);

					$element.append(_el).append(_label);
				}
			}
		} ]);