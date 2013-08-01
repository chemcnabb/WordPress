// authentication service
azureTicketsApp
    .factory(
        'pendingService',
        [
            'configService',
            '$q',
            '$rootScope',
            //'modelService',
            '$cookieStore',
            function(configService, $q, $rootScope, $cookieStore) {
                //var _clientKey = null, _domainProfile = null;
                var _pending = [];
                return {
                    loadAccessPending : function() {
                        var def = $q.defer();
                        BWL.Services.AccountService.AccessPendingAsync(function(request_list) {
                            console.log('request list');
                            console.log(request_list);
                            _pending = angular.isArray(request_list) ? request_list : [];
                            $rootScope.$apply(function() {
                                def.resolve();
                            });
                        }, function(err) {
                            $rootScope.$apply(function() {
                                def.reject(err)
                            })
                        });

                        return def.promise;
                    },

                    getAccessPending : function(){
                        return _pending;
                    }

                }
            }
        ]);