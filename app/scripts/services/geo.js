// geo service
azureTicketsApp.factory('geoService', [
        '$q',
        '$rootScope',
        function($q, $rootScope) {
            var _countries = null;

            return {
                getCountries : function() {
                    var def = $q.defer();

                    if (_countries !== null) {
                        def.resolve(_countries)
                    } else {
                        BWL.Services.GeoService.ListCountriesAsync(function(
                                countries) {
                            _countries = countries;

                            $rootScope.$apply(function() {
                                def.resolve(countries)
                            })
                        }, function(err) {
                            $rootScope.$apply(function() {
                                def.reject(err)
                            })
                        })
                    }

                    return def.promise;
                },
                getTimezonesByCountry : function(countryIso) {
                    var def = $q.defer();

                    BWL.Services.GeoService.ListTimezonesByCountryISOAsync(
                            countryIso, function(timezones) {
                                $rootScope.$apply(function() {
                                    def.resolve(timezones)
                                })
                            }, function(err) {
                                $rootScope.$apply(function() {
                                    def.reject(err)
                                })
                            })

                    return def.promise;
                },
                getRegionsByCountry : function(countryIso) {
                    var def = $q.defer();

                    BWL.Services.GeoService.ListRegionsByCountryAsync(
                            countryIso, function(regions) {
                                $rootScope.$apply(function() {
                                    def.resolve(regions)
                                })
                            }, function(err) {
                                $rootScope.$apply(function() {
                                    def.reject(err)
                                })
                            })

                    return def.promise;
                }
            }
        }
]);