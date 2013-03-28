// event service
azureTicketsApp
    .factory(
        'eventService',
        [
            '$q',
            '$rootScope',
            '$cookieStore',
            'modelService',
            'configService',
            'geoService',
            function($q, $rootScope, $cookieStore, modelService, configService,
                geoService) {
              var _events = [], _lastAvailableURI = null, _uiDateFormat = 'MM/dd/yyyy hh:mm tt';

              // format dates to be ISO 8601 as expected by API
              var _formatDates = function(tmpEvent) {
                tmpEvent.StartTime = new Date(tmpEvent.StartTime).toString('s');
                tmpEvent.EndTime = new Date(tmpEvent.EndTime).toString('s');
                tmpEvent.OnSaleDateTimeStart = new Date(
                    tmpEvent.OnSaleDateTimeStart).toString('s');
                tmpEvent.OnSaleDateTimeEnd = new Date(
                    tmpEvent.OnSaleDateTimeEnd).toString('s');
              }

              return {
                listEventsAsync : function(storeKey, pages) {
                  var def = $q.defer();

                  BWL.Services.ModelService.ListAsync(storeKey, 'Event', pages,
                      function(events) {
                        if (angular.isArray(events)) {
                          _events = events;
                        } else {
                          _events = [];
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
                getEvents : function() {
                  return _events;
                },
                getEvent : function() {
                  return modelService.getInstanceOf('Event');
                },
                initEvent : function(storeKey, eventKey) {
                  var def = $q.defer();

                  BWL.Services.ModelService
                      .ReadAsync(storeKey, "Event", eventKey, 10,
                          function(event) {
                            // prepare tmp var to be used by UI
                            if (angular.isDefined(event.Places)
                                && angular.isArray(event.Places)) {
                              event.tmpVenues = [];
                              angular.forEach(event.Places, function(ev) {
                                event.tmpVenues.push({
                                  id : ev.Key,
                                  text : ev.Name
                                })
                              })
                            }

                            try {
                              // parse date and make it compatible with select2
                              // widget
                              var st = new Date(event.StartTime);
                              var et = new Date(event.EndTime);
                              var sst = new Date(event.OnSaleDateTimeStart);
                              var set = new Date(event.OnSaleDateTimeEnd);
                              event.StartTime = st.toString(_uiDateFormat);
                              event.EndTime = et.toString(_uiDateFormat);
                              event.OnSaleDateTimeStart = sst
                                  .toString(_uiDateFormat);
                              event.OnSaleDateTimeEnd = set
                                  .toString(_uiDateFormat);
                            } catch (e) {
                            }

                            $rootScope.$apply(function() {
                              def.resolve(event)
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
                createEvent : function(storeKey, event) {
                  var def = $q.defer(), tmpEvent = angular.copy(event);

                  _formatDates(tmpEvent);

                  BWL.Services.ModelService.CreateAsync(storeKey, this
                      .getEvent().Type, tmpEvent, function(eventKey) {
                    $rootScope.$apply(function() {
                      def.resolve(eventKey)
                    });
                  }, function(err) {
                    $rootScope.$apply(function() {
                      def.reject(err)
                    })
                  });

                  return def.promise;
                },
                deleteEvent : function(storeKey, eventKey) {
                  var def = $q.defer();

                  BWL.Services.ModelService.DeleteAsync(storeKey, this
                      .getEvent().Type, eventKey, function() {
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
                addEventAddress : function(eventKey, address) {
                  var def = $q.defer(), _this = this;

                  BWL.Services.ModelService.CreateAsync(eventKey, "Address",
                      address, function(addressKey) {
                        BWL.Services.ModelService.AddAsync(eventKey, "Event",
                            eventKey, "Address", "Address", addressKey,
                            function(ret) {
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
                updateEvent : function(storeKey, event) {
                  var def = $q.defer(), tmpEvent = angular.copy(event);

                  delete tmpEvent.tmpVenues;
                  delete tmpEvent.$$hashKey;
                  delete tmpEvent.Type;

                  _formatDates(tmpEvent);

                  BWL.Services.ModelService.UpdateAsync(storeKey, 'Event',
                      event.Key, tmpEvent, function(ret) {
                        $rootScope.$apply(function() {
                          def.resolve(event)
                        });
                      }, function(err) {
                        $rootScope.$apply(function() {
                          def.reject(err)
                        })
                      });

                  return def.promise;
                },
                /**
                 * To be used from any controller, so it updates the
                 * $scope.events array without requiring us to do complex DI.
                 * 
                 * @param $scope
                 *          Scope to refresh
                 * @returns
                 */
                loadEvents : function($scope) {
                  $scope.storeKey = $scope.storeKey
                      || $cookieStore.get($scope.config.cookies.storeKey),
                      __this = this;

                  __this.listEventsAsync($scope.storeKey, 0).then(
                      function() {
                        $scope.events = __this.getEvents();

                        if ($scope.events.length > 0) {
                          angular.forEach($scope.events, function(event, i) {
                            __this.initEvent($scope.storeKey, event.Key).then(
                                function(event) {
                                  $scope.events[i] = event;
                                })
                          });
                        }
                      }, function(err) {
                        $scope.error.log(err)
                      });
                }
              }
            }
        ]);