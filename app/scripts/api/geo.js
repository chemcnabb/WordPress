BWL.Services.GeoService = {
    ReadContinentAsync : function (continentKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/continent/{0}'
                .format(continentKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListContinentsAsync : function (successCallback, errorCallback) {
        BWL.InvokeService('GET',
                'http://geo.azuretickets.com/geo.svc/continents', null,
                successCallback, errorCallback);
    },
    ReadCountryAsync : function (countryKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/country/{0}'
                .format(countryKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    FindCountryByISOAsync : function (countryISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/country/iso/{0}'
                .format(countryISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListCountriesAsync : function (successCallback, errorCallback) {
        BWL.InvokeService('GET',
                'http://geo.azuretickets.com/geo.svc/countries', null,
                successCallback, errorCallback);
    },
    ListCountriesByContinentAsync : function (continentISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/countries/{0}'
                .format(continentISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ReadCurrencyAsync : function (currencyKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/currency/{0}'
                .format(currencyKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListCurrenciesAsync : function (successCallback, errorCallback) {
        BWL.InvokeService('GET',
                'http://geo.azuretickets.com/geo.svc/currencies', null,
                successCallback, errorCallback);
    },
    ReadRegionAsync : function (regionKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/region/{0}'
                .format(regionKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    FindRegionByISOAsync : function (countryISO, regionISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/region/iso/{0}/{1}'
                .format(countryISO, regionISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListRegionsByCountryAsync : function (countryISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/regions/{0}'
                .format(countryISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ReadCityAsync : function (cityKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/city/{0}'
                .format(cityKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListCitiesByRegionAsync : function (countryISO, regionISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/cities/{0}/{1}'.format(
                countryISO, regionISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    FindCityAsync : function (name, countryISO, regionISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/city/search/{1}/{2}?name={0}'
                .format(name, countryISO, regionISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    FindCitiesAsync : function (name, countryISO, regionISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/cities/search/{1}/{2}?name={0}'
                .format(name, countryISO, regionISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ReadPostalAsync : function (postalKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/postal/{0}'
                .format(postalKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    FindPostalCodeAsync : function (countryISO, code, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/postal/{0}/{1}'.format(
                countryISO, code);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ReadTimezoneAsync : function (timezoneKey, successCallback, errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/timezone/{0}'
                .format(timezoneKey);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    },
    ListTimezonesAsync : function (successCallback, errorCallback) {
        BWL.InvokeService('GET',
                'http://geo.azuretickets.com/geo.svc/timezones', null,
                successCallback, errorCallback);
    },
    ListTimezonesByCountryISOAsync : function (countryISO, successCallback,
            errorCallback) {
        var uri = 'http://geo.azuretickets.com/geo.svc/timezones/{0}'
                .format(countryISO);
        BWL.InvokeService('GET', uri, null, successCallback, errorCallback);
    }
};