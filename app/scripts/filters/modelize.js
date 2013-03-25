/**
 * Display a friendly view of a model
 */
azureTicketsApp.filter('modelize', [
    '$window',
    '$filter',
    'objectService',
    function($window, $filter, objectService) {
      return function(model, extra1, extra2, extra3) {
        if (!angular.isDefined(model) || !angular.isObject(model)) {
          return;
        }

        var out = {};
        for (p in model) {
          if (angular.isObject(model[p]) && model[p].Type) {
            var pp = angular.isArray(model[p]) ? model[p][0] : model[p];

            switch (pp.Type) {
              case BWL.Model.Address.Type:
                var addr = {};
                var countries = extra1.getLoadedCountries();
                var regions = extra1.getLoadedRegions();
                var c = objectService.grep(countries, 'ISO', model[p].Country);
                var r = objectService.grep(regions, 'ISO', model[p].Region);

                addr.City = model[p].City;
                addr.Country = angular.isObject(c) ? c.Name : model[p].Country;
                addr.Region = angular.isObject(r) ? r.Name : model[p].Country;
                addr.AddressLine = [
                    model[p].AddressLine1, model[p].AddressLine2,
                    model[p].PostalCode
                ].filter(Boolean).join(', ');
                addr.Timezone = model[p].Timezone;

                out.Address = addr;
                break;
              case BWL.Model.PaymentProvider.Type:
                out.PaymentProvider = $filter('t')(
                    'Common.Text_Paypro_' + pp.ProviderType);
                break;
            }
          }
        }

        return out;
      };
    }
]);