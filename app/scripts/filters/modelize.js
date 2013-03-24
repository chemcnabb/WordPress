/**
 * Display a friendly view of a model
 */
azureTicketsApp.filter('modelize', [
    '$window',
    'objectService',
    function($window, objectService) {
      return function(model, extra1, extra2, extra3) {
        if (!angular.isDefined(model) || !angular.isObject(model)) {
          return;
        }

        var out = {};
        for (p in model) {
          if (angular.isObject(model[p]) && model[p].Type) {
            switch (model[p].Type) {
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
            }
          }
        }
debugger
        return out;
      };
    }
]);