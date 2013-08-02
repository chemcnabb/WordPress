// authentication service
azureTicketsApp
    .factory(
        'pendingService',
        [

            '$q',
            '$rootScope',

            function($q, $rootScope) {
                //var _clientKey = null, _domainProfile = null;
                var _pending = [];
                return {
                    loadAccessPending : function() {
                        var def = $q.defer();
                        BWL.Services.AccountService.AccessPendingAsync(function(request_list) {
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