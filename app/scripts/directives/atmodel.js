/**
 * This directive will display a friendly version of a model object, by parsing
 * and iterating through model's properties and using locale resources to
 * properly display labels.
 */
azureTicketsApp
    .directive(
        'atmodel',
        [
            '$compile',
            '$filter',
            'objectService',
            function($compile, $filter, objectService) {
              var _render = function(obj) {
                var e = jQuery('<div class="clearfix atmodel well well-small" />');
                e.append('<dl />');

                for (label in obj) {
                  var dt = jQuery('<dt />'), dd = jQuery('<dd />');
                  dt.text(label);
                  dd.append((angular.isObject(obj[label]) ? _render(obj[label])
                      : obj[label]));
                  e.find('dl').first().append(dt, dd);
                }

                return e;
              }

              return {
                restrict : 'E',
                scope : {
                  atExtra1 : '=extra1', // usually is instance of geoService,
                  // when
                  // object is or has an Address object.
                  atExtra2 : '=extra2', // PaymentProviders array for objects
                  // containing
                  // a PaymentProvider property
                  atExtra3 : '=extra3',
                  atModel : '=ngModel'
                },
                link : function($scope, $element, $attrs) {
                  var out = {}, resPrefix = 'Common.Label'
                      + $scope.atModel.Type;

                  for (p in $scope.atModel) {
                    // we ignore tmp variables
                    if (/^tmp.*$/g.test(p)) {
                      continue
                    }

                    var pp = angular.isArray($scope.atModel[p]) ? $scope.atModel[p][0]
                        : $scope.atModel[p];

                    if (angular.isString(pp) && pp !== '' && [
                        // hide these properties
                        'URI', 'Key', 'Type', 'Currency', '$$hashKey'
                    ].indexOf(p) === -1) {
                      out[$filter('t')(resPrefix + p)] = pp;
                    } else if (angular.isString(pp)
                        && p === BWL.Model.Currency.Type) {
                      // handle Currency property
                      var c = objectService.grep($scope.atExtra2, 'ISO', pp);
                      out[$filter('t')(resPrefix + p)] = c.Name;
                    } else if (angular.isObject(pp) && pp.Type) {
                      switch (pp.Type) {
                        // handle Address type
                        case BWL.Model.Address.Type:
                          var addr = {};
                          var countries = $scope.atExtra1.getLoadedCountries();
                          var regions = $scope.atExtra1.getLoadedRegions();
                          var c = objectService.grep(countries, 'ISO',
                              pp.Country);
                          var r = objectService.grep(regions, 'ISO', pp.Region);

                          addr[$filter('t')('Address.LabelCity')] = pp.City;
                          addr[$filter('t')('Address.LabelPostalCode')] = pp.PostalCode;
                          addr[$filter('t')('Address.LabelCountry')] = angular
                              .isObject(c) ? c.Name : pp.Country;
                          var sp = $filter('t')('Address.LabelProvince')
                              + ' / ' + $filter('t')('Address.LabelState');
                          addr[sp] = angular.isObject(r) ? r.Name
                              : $scope.atModel[p].Region;
                          addr[$filter('t')('Address.LabelFullAddress')] = [
                              pp.AddressLine1, pp.AddressLine2, pp.PostalCode
                          ].filter(Boolean).join(', ');
                          addr[$filter('t')('Address.LabelTimezone')] = pp.Timezone;

                          out[$filter('t')('Common.Text_LocationInfo')] = addr;
                          break;
                        // Handle PaymentProvider type
                        case BWL.Model.PaymentProvider.Type:
                          out[$filter('t')(resPrefix + 'PaymentProvider')] = $filter(
                              't')('Common.Text_Paypro_' + pp.ProviderType);
                          break;
                        // Handle StoreURI type
                        case BWL.Model.StoreURI.Type:
                          out[$filter('t')('Common.Text_CustomURI')] = pp.URI;
                          break;
                      }
                    }
                  }

                  $element.append(_render(out));
                }
              }
            }
        ]);