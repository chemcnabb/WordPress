'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', ['ui']);

// routes
azureTicketsApp.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/admin', {
                templateUrl : 'views/admin.html',
                controller : adminController
            }).when(
                    '/auth/logoff',
                    {
                        controller : adminController,
                        templateUrl : 'views/admin.html',
                        resolve : {
                            logoff : [
                                    'authService',
                                    '$rootScope',
                                    '$location',
                                    function (authService, $rootScope,
                                            $location) {
                                        authService.logoffAsync(function () {
                                            authService.setDomainProfile(null);
                                            $location.path('/admin');
                                            $rootScope.$digest();
                                        });
                                    }]
                        }
                    }).when('/front', {
                templateUrl : 'views/front.html',
                controller : frontController
            }).otherwise({
                redirectTo : '/'
            }).when('/admin/store', {
                templateUrl : 'views/store.html',
                controller : storeController
            });
        }]);

// services
azureTicketsApp.factory('configService', function () {
    return {
        appName : '<%= at.name %>',
        clientKey : 'b31e42d6-9205-417d-a2d9-366abc7d5046',
        multipleStores : false
    }
});

// authentication service
azureTicketsApp
        .factory(
                'authService',
                [
                        'configService',
                        function (configService) {
                            var _clientKey = null;

                            return {
                                authenticate : function (cbk, errCbk) {
                                    if (!this.isDomainProfileReady()) {
                                        this.loadProfileAsync(
                                                configService.clientKey, cbk,
                                                errCbk);
                                    } else {
                                        cbk();
                                    }
                                },
                                loadProfileAsync : function (clientKey, cbk,
                                        errCbk) {
                                    BWL.ClientKey = clientKey;
                                    _clientKey = clientKey;
                                    BWL.oAuth.LoadProfileAsync(cbk, errCbk);
                                },
                                logonByProviderAsync : function (provider, cbk,
                                        errCbk) {
                                    BWL.oAuth.Init(_clientKey);
                                    BWL.Services.SystemProfileService
                                            .GetProfileAsync(
                                                    5,
                                                    function (profile) {
                                                        if (profile.DomainProfileId !== 0) {
                                                            cbk();
                                                        } else {
                                                            BWL.oAuth
                                                                    .LogonAsync(
                                                                            provider,
                                                                            cbk,
                                                                            errCbk);
                                                        }
                                                    }, errCbk)
                                },
                                logonAsync : function (account, cbk, errCbk) {
                                    try {
                                        BWL.Services.SystemProfileService
                                                .LogonAsync(account, cbk,
                                                        errCbk);
                                    } catch (err) {
                                        errCbk(err)
                                    }
                                },
                                logoffAsync : function (cbk) {
                                    BWL.Services.SystemProfileService
                                            .LogoffAsync(cbk);
                                },
                                getDomainProfile : function () {
                                    return BWL.Profile
                                            || angular
                                                    .copy(BWL.Model['DomainProfile']);
                                },
                                setDomainProfile : function (profile) {
                                    BWL.Profile = null;
                                },
                                getAccountProfile : function () {
                                    return (BWL.Profile !== null ? BWL.Profile.AccountProfile
                                            : BWL.Profile)
                                            || angular
                                                    .copy(BWL.Model['AccountProfile']);
                                },
                                loadAuthProviders : function (cbk, errCbk) {
                                    BWL.Services.oAuthService
                                            .ListAuthProvidersAsync(cbk, errCbk);
                                },
                                isDomainProfileReady : function () {
                                    return (this.getDomainProfile() !== null
                                            && angular.isDefined(this
                                                    .getDomainProfile().Key) && this
                                            .getDomainProfile().Key !== null)
                                }
                            }
                        }]);

// permission service
azureTicketsApp.factory('permService', [
        'authService',
        function (authService) {
            return {
                canRead : function (model) {
                    if (angular.isDefined(model.Type)
                            && angular.isDefined(BWL.ModelMeta[model.Type])) {
                        var m = BWL.ModelMeta[model];

                        if (m.__perms.Read === 0)
                            return true;

                        var p = authService.getDomainProfile();

                        return p.ProfileRole >= m.__perms.Read;
                    }

                    return false;
                }
            }
        }]);

// store service
azureTicketsApp.factory('storeService', function () {
    var _stores = null;

    return {
        listStoresAsync : function (levels, cbk, errCbk) {
            BWL.Services.StoreService.ListStoresAsync(levels,
                    function (stores) {
                        _stores = stores;
                        cbk();
                    }, errCbk);

        },
        getStores : function () {
            return _stores;
        },
        getStore : function () {
            return BWL.Store || angular.copy(BWL.Model['Store']);
        },
        initStore : function (storeKey, cbk) {
            BWL.Services.ModelService.ReadAsync(storeKey, "Store", storeKey,
                    10, function (store) {
                        BWL.Services.GeoService.ReadCurrencyAsync(
                                store.Currency, function (currency) {
                                    cbk(store);
                                });
                    });
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
        }]);

// directives

/**
 * This directive will attach the field to a model applied to the rules defined
 * in modelsmeta.js .
 */
azureTicketsApp
        .directive(
                'atfield',
                [
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
                                    var _req = angular
                                            .isDefined($attrs.ngRequired) ? 'ng-required="true"'
                                            : '';

                                    // set label if defined
                                    if (angular.isDefined($attrs.label)) {
                                        _label = jQuery('<label />');
                                        _label.text('{{atLabel}}');
                                        if (angular
                                                .isDefined($attrs.labelClass))
                                            _label.addClass($attrs.labelClass);
                                    }

                                    // set proper element definition
                                    if (/^(?:String|Double|Char)/g
                                            .test(fieldType)) {
                                        _attr.type = !isPass ? 'text'
                                                : 'password',
                                                _el = jQuery('<input ' + _req
                                                        + '/>');
                                        if (_label !== null)
                                            _label.addClass('pull-left');

                                    } else if (/^(?:Text)/g.test(fieldType)) {
                                        _el = jQuery('<textarea />');
                                        if (_label !== null)
                                            _label.addClass('pull-left');

                                    } else if (/^Int/g.test(fieldType)) {
                                        _attr.type = 'number',
                                                _el = jQuery('<input ' + _req
                                                        + '/>');
                                        if (_label !== null)
                                            _label.addClass('pull-left');

                                    } else if (/^Boolean/g.test(fieldType)) {
                                        _attr.type = 'checkbox',
                                                _el = jQuery('<input />');
                                        if (_label !== null)
                                            _label.addClass('pull-right');
                                    } else if (/^Date|Time/g.test(fieldType)) {
                                        _attr.type = 'text',
                                                _el = jQuery('<input />');
                                        _el.attr('ui-date', true);

                                        if (_label !== null)
                                            _label.addClass('pull-right');
                                    } else if (/^.*Enum(?=\b).*$/g
                                            .test(fieldType)) {
                                        _el = jQuery('<select />');
                                        var _enum = BWL.ModelEnum[fieldType
                                                .replace(/^(.*Enum)(?=\b).*$/g,
                                                        '$1')];
                                        for ( var e in _enum) {
                                            _el
                                                    .append(jQuery(
                                                            '<option value="'
                                                                    + _enum[e]
                                                                    + '" />')
                                                            .text(e));
                                        }
                                    }

                                    // define new element attributes
                                    for (p in $attrs) {
                                        if (angular.isString($attrs[p])
                                                && ['ngModel', 'ngRequired']
                                                        .indexOf(p) === -1) {
                                            p = p.replace(
                                                    /^([a-z]+)([A-Z]+)(\w+)$/g,
                                                    '$1-$2$3').toLowerCase();

                                            _el
                                                    .attr(
                                                            p,
                                                            angular
                                                                    .isDefined($attrs[p]) ? $attrs[p]
                                                                    : '');
                                        }
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
                        }]);