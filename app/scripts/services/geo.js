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
            BWL.Services.GeoService.ListCountriesAsync(function(countries) {
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

          BWL.Services.GeoService.ListTimezonesByCountryISOAsync(countryIso,
              function(timezones) {
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

          BWL.Services.GeoService.ListRegionsByCountryAsync(countryIso,
              function(regions) {
                $rootScope.$apply(function() {
                  def.resolve(regions)
                })
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              })

          return def.promise;
        },
        createAddressForStore : function(storeKey, address) {
          var def = $q.defer();

          BWL.Services.ModelService.CreateAsync(storeKey, "Address", address,
              function(addressKey) {
                if (addressKey) {
                  BWL.Services.ModelService.AddAsync(storeKey, "Store",
                      storeKey, "Address", "Address", addressKey,
                      function(ret) {
                        $rootScope.$apply(function() {
                          def.resolve(ret)
                        })
                      }, function(err) {
                        $rootScope.$apply(function() {
                          def.reject(err)
                        })
                      });
                }
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                });
              });

          return def.promise;
        },
        updateAddress : function(address) {
          var def = $q.defer();

          BWL.Services.ModelService.UpdateAsync(address.Key, 'Address',
              address.Key, address, function(ret) {
                $rootScope.$apply(function() {
                  def.resolve()
                })
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        }
      }
    }
]);