'use strict';

var azureTicketsApp = angular.module('azureTicketsApp', ['ui']);

// routes
azureTicketsApp
        .config([
                '$routeProvider',
                function ($routeProvider) {
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
                                                    function (authService,
                                                            $rootScope,
                                                            $location) {
                                                        authService
                                                                .logoffAsync()
                                                                .then(
                                                                        function () {
                                                                            authService
                                                                                    .setDomainProfile(null);
                                                                            $location
                                                                                    .path('/admin');

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

// config service
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
                        '$q',
                        '$rootScope',
                        function (configService, $q, $rootScope) {
                            var _clientKey = null;

                            return {
                                /**
                                 * Authenticate user
                                 * 
                                 * @param {object}
                                 *            $scope We're authenticating on the
                                 *            scope of a controller.
                                 * @param {function}
                                 *            cbk Executes on success.
                                 * @param {function}
                                 *            errCbk Executes on error.
                                 * @returns
                                 */
                                authenticate : function ($scope) {
                                    var _this = this, def = $q.defer();

                                    if (!this.isDomainProfileReady()) {
                                        this
                                                .loadProfileAsync(
                                                        configService.clientKey)
                                                .then(
                                                        function () {
                                                            $scope.DomainProfile = _this
                                                                    .getDomainProfile();

                                                            if (!$scope.$$phase)
                                                                $scope.$apply()

                                                            def.resolve();
                                                        },
                                                        function (err) {
                                                            $rootScope
                                                                    .$apply(function () {
                                                                        def
                                                                                .reject(err)
                                                                    })
                                                        });
                                    } else {
                                        def.resolve();
                                    }

                                    return def.promise;
                                },
                                loadProfileAsync : function (clientKey) {
                                    var def = $q.defer();

                                    BWL.ClientKey = clientKey;
                                    _clientKey = clientKey;

                                    BWL.oAuth.LoadProfileAsync(function () {
                                        $rootScope.$apply(def.resolve)
                                    }, function (err) {
                                        $rootScope.$apply(function () {
                                            def.reject(err)
                                        })
                                    });

                                    return def.promise;
                                },
                                logonByProviderAsync : function (provider) {
                                    var def = $q.defer();

                                    BWL.oAuth.Init(_clientKey);
                                    BWL.Services.SystemProfileService
                                            .GetProfileAsync(
                                                    5,
                                                    function (profile) {
                                                        if (profile.DomainProfileId !== 0) {
                                                            $rootScope
                                                                    .$apply(def.resolve);
                                                        } else {
                                                            BWL.oAuth
                                                                    .LogonAsync(
                                                                            provider,
                                                                            function () {
                                                                                $rootScope
                                                                                        .$apply(def.resolve);
                                                                            },
                                                                            function (
                                                                                    err) {
                                                                                $rootScope
                                                                                        .$apply(function () {
                                                                                            def
                                                                                                    .reject(err)
                                                                                        })
                                                                            });
                                                        }
                                                    },
                                                    function (err) {
                                                        $rootScope
                                                                .$apply(function () {
                                                                    def
                                                                            .reject(err)
                                                                })
                                                    })

                                    return def.promise;
                                },
                                registerAsync : function (account) {
                                    var def = $q.defer();

                                    // request level 20 perms, this is for
                                    // store owners perms
                                    BWL.Services.SystemProfileService
                                            .RegisterAsync(
                                                    20,
                                                    account,
                                                    function () {
                                                        $rootScope
                                                                .$apply(def.resolve);
                                                    },
                                                    function (err) {
                                                        $rootScope
                                                                .$apply(function () {
                                                                    def
                                                                            .reject(err)
                                                                })
                                                    });

                                    return def.promise;
                                },
                                logonAsync : function (account) {
                                    var def = $q.defer();

                                    BWL.Services.SystemProfileService
                                            .LogonAsync(account, function () {
                                                $rootScope.$apply(def.resolve);
                                            }, function (err) {
                                                $rootScope.$apply(function () {
                                                    def.reject(err)
                                                })
                                            });

                                    return def.promise;

                                },
                                logoffAsync : function () {
                                    var def = $q.defer();

                                    BWL.Services.SystemProfileService
                                            .LogoffAsync(function () {
                                                $rootScope.$apply(def.resolve);
                                            });

                                    return def.promise;
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
                                    var o = (BWL.Profile !== null ? BWL.Profile.AccountProfile
                                            : BWL.Profile)
                                            || angular
                                                    .copy(BWL.Model['AccountProfile']);
                                    // one exception where we modify modelsmeta
                                    // to hold a tmp field
                                    o.Password = angular.isDefined(o.Password) ? o.Password
                                            : null;
                                    o.ConfirmPassword = angular
                                            .isDefined(o.ConfirmPassword) ? o.ConfirmPassword
                                            : null;
                                    BWL.ModelMeta.AccountProfile.Password = angular
                                            .copy(BWL.ModelMeta.AccountProfile.PasswordHash);
                                    BWL.ModelMeta.AccountProfile.ConfirmPassword = angular
                                            .copy(BWL.ModelMeta.AccountProfile.Password);
                                    return o;
                                },
                                loadAuthProviders : function (cbk, errCbk) {
                                    var def = $q.defer();

                                    BWL.Services.oAuthService
                                            .ListAuthProvidersAsync(function (
                                                    providers) {
                                                $rootScope.$apply(function () {
                                                    def.resolve(providers)
                                                })
                                            }, function (err) {
                                                $rootScope.$apply(function () {
                                                    def.reject(err)
                                                })
                                            });

                                    return def.promise;
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
azureTicketsApp.factory('storeService', [
        '$q',
        '$rootScope',
        function ($q, $rootScope) {
            var _stores = null;

            return {
                listStoresAsync : function (levels) {
                    var def = $q.defer();

                    BWL.Services.StoreService.ListStoresAsync(levels, function (
                            stores) {
                        _stores = stores;

                        $rootScope.$apply(function () {
                            def.resolve();
                        });
                    }, function (err) {
                        $rootScope.$apply(function () {
                            def.reject(err)
                        })
                    });

                    return def.promise;
                },
                hasStore : function () {
                    return _stores !== null && angular.isObject(_stores[0])
                            && _stores[0].Key !== null
                },
                getStores : function () {
                    return _stores;
                },
                getStore : function () {
                    return BWL.Store || angular.copy(BWL.Model['Store']);
                },
                initStore : function (storeKey) {
                    var def = $q.defer();

                    BWL.Services.ModelService.ReadAsync(storeKey, "Store",
                            storeKey, 10, function (store) {
                                BWL.Services.GeoService.ReadCurrencyAsync(
                                        store.Currency, function (currency) {
                                            $rootScope.$apply(function () {
                                                def.resolve(store, currency)
                                            });
                                        }, function (err) {
                                            $rootScope.$apply(function () {
                                                def.reject(err)
                                            })
                                        });
                            });

                    return def.promise;
                }
            }
        }]);

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
 * This directive will generate a HTML form field following type definition
 * rules from modelsmeta.js.
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
                                    atLabel : '=label',
                                    atChange : '=ngChange',
                                    atUiValidate : '=uiValidate',
                                    atUiValidateWatch : '=uiValidateWatch',
                                },
                                link : function ($scope, $element, $attrs) {
                                    var m = $attrs.ngModel.split('.')[0];
                                    var f = $attrs.ngModel.split('.')[1];
                                    var copyOf = angular
                                            .isDefined($attrs.atCopy) ? BWL.ModelMeta[$attrs.atCopy]
                                            : null
                                    var fieldType = angular
                                            .isDefined(BWL.ModelMeta[m]) ? BWL.ModelMeta[m][f]
                                            : copyOf[f];
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
                                    } else if (/^(?:Text)/g.test(fieldType)) {
                                        _el = jQuery('<textarea />');
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
                                    for (p in _attr) {
                                        _el.attr(p, _attr[p]);
                                    }
                                    for (p in $attrs) {
                                        if (angular.isString($attrs[p])
                                                && ['ngModel', 'ngRequired',
                                                        'ngChange',
                                                        'uiValidate',
                                                        'uiValidateWatch']
                                                        .indexOf(p) === -1) {
                                            var pp = p.replace(/([A-Z]+)/g,
                                                    '-$1').toLowerCase();

                                            var v = $scope.$eval($attrs[p]) !== 0 ? $scope
                                                    .$eval($attrs[p])
                                                    : $attrs[p]

                                            _el.attr(pp,
                                                    angular.isDefined(v) ? v
                                                            : '');
                                        }
                                    }

                                    // make new element available
                                    _el.attr('ng-model', 'atModel');
                                    $element.append(_label).append(_el);

                                    if ($attrs.uiValidate)
                                        _el.attr('ui-validate', 'atUiValidate');
                                    if ($attrs.uiValidateWatch)
                                        _el.attr('ui-validate-watch',
                                                'atUiValidateWatch');

                                    if (_label !== null)
                                        $compile(_label)($scope);
                                    $compile(_el)($scope);
                                }
                            }
                        }]);