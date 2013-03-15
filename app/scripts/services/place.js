// place service
azureTicketsApp.factory('placeService', [
    '$q',
    '$rootScope',
    'modelService',
    'configService',
    'geoService',
    function($q, $rootScope, modelService, configService, geoService) {
      var _places = [], _lastAvailableURI = null;

      return {
        listPlacesAsync : function(storeKey, pages) {
          var def = $q.defer();

          BWL.Services.ModelService.ListAsync(storeKey, 'Place', pages,
              function(places) {
                if (angular.isArray(places)) {
                  _places = places;
                } else {
                  _places = [];
                }

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
        getPlaces : function() {
          return _places;
        },
        getPlace : function() {
          return modelService.getInstanceOf('Place');
        },
        initPlace : function(storeKey, placeKey) {
          var def = $q.defer();

          BWL.Services.ModelService
              .ReadAsync(storeKey, "Place", placeKey, 10,
                  function(place) {
                    if (!angular.isDefined(place.Address)
                        || place.Address === null) {
                      place.Address = modelService.getInstanceOf('Address');
                    }
                    $rootScope.$apply(function() {
                      def.resolve(place)
                    });
                  }, function(err) {
                    $rootScope.$apply(function() {
                      def.reject(err)
                    })
                  }, function(err) {
                    $rootScope.$apply(function() {
                      def.reject(err)
                    })
                  });

          return def.promise;
        },
        createPlace : function(storeKey, place) {
          var def = $q.defer();

          BWL.Services.ModelService.CreateAsync(storeKey, this.getPlace().Type,
              place, function(placeKey) {
                $rootScope.$apply(function() {
                  def.resolve(placeKey)
                });
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        deletePlace : function(storeKey, event) {
          var def = $q.defer();

          BWL.Services.ModelService.DeleteAsync(storeKey, this.getEvent().Type,
              event.Key, function() {
                $rootScope.$apply(function() {
                  def.resolve()
                });
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        addPlaceAddress : function(placeKey, address) {
          var def = $q.defer(), _this = this;

          BWL.Services.ModelService.CreateAsync(placeKey, "Address", address,
              function(addressKey) {
                BWL.Services.ModelService.AddAsync(placeKey, "Place", placeKey,
                    "Address", "Address", addressKey, function(ret) {
                      $rootScope.$apply(def.resolve)
                    }, function(err) {
                      $rootScope.$apply(function() {
                        def.reject(err)
                      })
                    });
              }, function(err) {
                $rootScope.$apply(function() {
                  def.reject(err)
                })
              });

          return def.promise;
        },
        updatePlace : function(storeKey, place) {
          var def = $q.defer(), tmpPlace = angular.copy(place);
          var _place = angular.copy(place);

          delete tmpPlace.Address;

          BWL.Services.ModelService.UpdateAsync(storeKey, 'Place', _place.Key,
              tmpPlace, function(ret) {
                $rootScope.$apply(function() {
                  def.resolve(_place)
                });
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