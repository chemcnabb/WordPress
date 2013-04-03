// ticket service
azureTicketsApp
    .factory(
        'ticketService',
        [
            '$q',
            '$rootScope',
            '$cookieStore',
            '$timeout',
            'modelService',
            'configService',
            'objectService',
            'geoService',
            function($q, $rootScope, $cookieStore, $timeout, modelService,
                configService, objectService, geoService) {
              var _tickets = [], _uiDateFormat = 'MM/dd/yyyy hh:mm tt', _isTicketsLoading = false;

              // format dates to be ISO 8601 as expected by API
              var _formatDates = function(tmpTicket) {
                tmpTicket.OnSaleDateTimeStart = new Date(
                    tmpTicket.OnSaleDateTimeStart).toString('s');
                tmpTicket.OnSaleDateTimeEnd = new Date(
                    tmpTicket.OnSaleDateTimeEnd).toString('s');
              }

              return {
                listTicketsAsync : function(storeKey, pages) {
                  var def = $q.defer();

                  BWL.Services.ModelService.ListAsync(storeKey,
                      'GeneralAdmissionTicketItemInfo', pages,
                      function(tickets) {
                        if (angular.isArray(tickets)) {
                          _tickets = tickets;
                        } else {
                          _tickets = [];
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
                getTickets : function() {
                  return _tickets;
                },
                getTicket : function() {
                  return modelService
                      .getInstanceOf('GeneralAdmissionTicketItemInfo');
                },
                initTicket : function(storeKey, ticketKey) {
                  var def = $q.defer();

                  BWL.Services.ModelService.ReadAsync(storeKey,
                      "GeneralAdmissionTicketItemInfo", ticketKey, 10,
                      function(_ticket) {
                        try {
                          // parse date and make it compatible with select2
                          // widget
                          var sst = new Date(_ticket.OnSaleDateTimeStart);
                          var set = new Date(_ticket.OnSaleDateTimeEnd);
                          _ticket.OnSaleDateTimeStart = sst
                              .toString(_uiDateFormat);
                          _ticket.OnSaleDateTimeEnd = set
                              .toString(_uiDateFormat);
                        } catch (e) {
                        }

                        $rootScope.$apply(function() {
                          def.resolve(_ticket)
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
                createTicket : function(storeKey, ticket) {
                  var def = $q.defer(), tmpTicket = angular.copy(ticket);

                  _formatDates(tmpTicket);

                  BWL.Services.ModelService.CreateAsync(storeKey, this
                      .getTicket().Type, tmpTicket, function(ticketKey) {
                    $rootScope.$apply(function() {
                      def.resolve(ticketKey)
                    });
                  }, function(err) {
                    $rootScope.$apply(function() {
                      def.reject(err)
                    })
                  });

                  return def.promise;
                },
                deleteTicket : function(storeKey, ticketKey) {
                  var def = $q.defer();

                  BWL.Services.ModelService.DeleteAsync(storeKey, this
                      .getTicket().Type, ticketKey, function() {
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
                updateTicket : function(storeKey, ticket) {
                  var def = $q.defer(), tmpTicket = angular.copy(ticket);

                  delete tmpTicket.$$hashKey;
                  delete tmpTicket.Type;

                  _formatDates(tmpTicket);

                  BWL.Services.ModelService.UpdateAsync(storeKey,
                      'GeneralAdmissionTicketItemInfo', ticket.Key, tmpTicket,
                      function(ret) {
                        $rootScope.$apply(function() {
                          def.resolve(ticket)
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
                 * $scope.tickets array without requiring us to do complex DI.
                 * 
                 * @param $scope
                 *          Scope to refresh
                 * @returns
                 */
                loadTickets : function($scope) {
                  if (!_isTicketsLoading) {
                    _isTicketsLoading = true;

                    $scope.storeKey = $scope.storeKey
                        || $cookieStore.get($scope.config.cookies.storeKey),
                        __this = this;

                    __this.listTicketsAsync($scope.storeKey, 0).then(
                        function() {
                          $scope.tickets = __this.getTickets();

                          if ($scope.tickets.length > 0) {
                            angular.forEach($scope.tickets,
                                function(ticket, i) {
                                  __this
                                      .initTicket($scope.storeKey, ticket.Key)
                                      .then(function(ticket) {
                                        $scope.tickets[i] = ticket;
                                      })
                                });
                          }

                          _isTicketsLoading = false;
                        }, function(err) {
                          _isTicketsLoading = false;
                          $scope.error.log(err)
                        });
                  }
                }
              }
            }
        ]);