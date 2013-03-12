// authentication service
azureTicketsApp
        .factory(
                'authService',
                [
                        'configService',
                        '$q',
                        '$rootScope',
                        'modelService',
                        function(configService, $q, $rootScope, modelService) {
                            var _clientKey = null, _domainProfile = null;

                            return {
                                /**
                                 * Authenticate user
                                 * 
                                 * @param {object}
                                 *            $scope We're authenticating on the
                                 *            scope of a controller.
                                 * @returns
                                 */
                                authenticate : function($scope) {
                                    var _this = this, def = $q.defer();

                                    if (!this.isDomainProfileReady()) {
                                        this
                                                .loadProfileAsync(
                                                        configService.clientKey)
                                                .then(
                                                        function() {
                                                            $scope.DomainProfile = _this
                                                                    .getDomainProfile();

                                                            if (!$scope.$$phase) {
                                                                $scope.$apply()
                                                            }
                                                            def.resolve();
                                                        },
                                                        function(err) {
                                                            $scope
                                                                    .$apply(function() {
                                                                        def
                                                                                .reject(err)
                                                                    })
                                                        });
                                    } else {
                                        def.resolve();
                                    }

                                    return def.promise;
                                },
                                isAuthenticated : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Authenticated;
                                },
                                isMember : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Member;
                                },
                                isPublic : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Public;
                                },
                                isExplicit : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Explicit;
                                },
                                isStoreOwner : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.StoreOwner;
                                },
                                isEmployee : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Employee;
                                },
                                isService : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Service;
                                },
                                isAdministrator : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.Administrator;
                                },
                                isNoAccess : function() {
                                    return _domainProfile.ProfileRole === BWL.ModelEnum.DomainProfileRoleEnum.NoAccess;
                                },
                                upgradeProfile : function() {
                                    var def = $q.defer();

                                    BWL.Services.SystemProfileService
                                            .SignupAsync(function() {
                                                $rootScope.$apply(def.resolve)
                                            }, function(err) {
                                                $rootScope.$apply(function() {
                                                    def.reject(err)
                                                })
                                            });

                                    return def.promise;
                                },
                                loadProfileAsync : function(clientKey) {
                                    var def = $q.defer();

                                    BWL.ClientKey = clientKey;
                                    _clientKey = clientKey;

                                    BWL.oAuth.LoadProfileAsync(function() {
                                        $rootScope.$apply(def.resolve)
                                    }, function(err) {
                                        $rootScope.$apply(function() {
                                            def.reject(err)
                                        })
                                    });

                                    return def.promise;
                                },
                                logonByProviderAsync : function(provider) {
                                    var def = $q.defer();

                                    BWL.oAuth.Init(_clientKey);
                                    BWL.Services.SystemProfileService
                                            .GetProfileAsync(
                                                    5,
                                                    function(profile) {
                                                        if (profile.DomainProfileId !== 0) {
                                                            $rootScope
                                                                    .$apply(def.resolve);
                                                        } else {
                                                            BWL.oAuth
                                                                    .LogonAsync(
                                                                            provider,
                                                                            function() {
                                                                                $rootScope
                                                                                        .$apply(def.resolve);
                                                                            },
                                                                            function(
                                                                                    err) {
                                                                                $rootScope
                                                                                        .$apply(function() {
                                                                                            def
                                                                                                    .reject(err)
                                                                                        })
                                                                            });
                                                        }
                                                    },
                                                    function(err) {
                                                        $rootScope
                                                                .$apply(function() {
                                                                    def
                                                                            .reject(err)
                                                                })
                                                    })

                                    return def.promise;
                                },
                                registerAsync : function(account) {
                                    var def = $q.defer();

                                    // request level 20 perms, this is for
                                    // store owners perms
                                    BWL.Services.SystemProfileService
                                            .RegisterAsync(
                                                    20,
                                                    account,
                                                    function() {
                                                        $rootScope
                                                                .$apply(def.resolve);
                                                    },
                                                    function(err) {
                                                        $rootScope
                                                                .$apply(function() {
                                                                    def
                                                                            .reject(err)
                                                                })
                                                    });

                                    return def.promise;
                                },
                                logonAsync : function(account) {
                                    var def = $q.defer();

                                    BWL.Services.SystemProfileService
                                            .LogonAsync(account, function() {
                                                $rootScope.$apply(def.resolve);
                                            }, function(err) {
                                                $rootScope.$apply(function() {
                                                    def.reject(err)
                                                })
                                            });

                                    return def.promise;

                                },
                                logoffAsync : function() {
                                    var def = $q.defer();

                                    BWL.Services.SystemProfileService
                                            .LogoffAsync(function() {
                                                $rootScope.$apply(def.resolve);
                                            });

                                    return def.promise;
                                },
                                getDomainProfile : function() {
                                    _domainProfile = modelService
                                            .getInstanceOf('DomainProfile',
                                                    null, 'Profile');
                                    return _domainProfile;
                                },
                                setDomainProfile : function(profile) {
                                    BWL.Profile = null;
                                },
                                getAccountProfile : function() {
                                    var o = BWL.Profile !== null
                                            && angular
                                                    .isDefined(BWL.Profile.AccountProfile) ? BWL.Profile.AccountProfile
                                            : modelService
                                                    .getInstanceOf('AccountProfile');
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
                                loadAuthProviders : function(cbk, errCbk) {
                                    var def = $q.defer();

                                    BWL.Services.oAuthService
                                            .ListAuthProvidersAsync(function(
                                                    providers) {
                                                $rootScope.$apply(function() {
                                                    def.resolve(providers)
                                                })
                                            }, function(err) {
                                                $rootScope.$apply(function() {
                                                    def.reject(err)
                                                })
                                            });

                                    return def.promise;
                                },
                                isDomainProfileReady : function() {
                                    return this.getDomainProfile() !== null
                                            && angular.isDefined(this
                                                    .getDomainProfile().Key)
                                            && this.getDomainProfile().Key !== null
                                }
                            }
                        }
                ]);