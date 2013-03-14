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
        listPlacesAsync : function(pages) {
          var def = $q.defer();

          BWL.Services.PlaceService.ListPlacesAsync(levels, function(places) {
            _places = places;

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
        createPlace : function(place) {
          var def = $q.defer();

          BWL.Services.ModelService.CreateAsync(configService.container.store,
              this.getPlace().Type, place, function(placeKey) {
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
        updatePlace : function(place) {
          var def = $q.defer(), tmpPlace = angular.copy(place);
          var _place = angular.copy(place);

          delete tmpPlace.Address;

          BWL.Services.ModelService.UpdateAsync(_place.Key, 'Place',
              _place.Key, tmpPlace, function(ret) {
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