// model service
azureTicketsApp.factory('modelService', function() {
    return {
        /**
         * Returns a new instance of the specified model.
         * 
         * @param modelName
         *            Model instance to retrieve
         * @param tmpAttrs
         *            Additional attributes to add to the new instance.
         * @param alias
         *            Alias used in BWL, used to retrieve loaded instance.
         * @returns
         */
        getInstanceOf : function(modelName, tmpAttrs, alias) {
            var o = {};
            var a = alias ? alias : modelName;

            if (angular.isDefined(BWL[a])) {
                o = BWL[a]
            } else if (angular.isDefined(BWL.Model[modelName])) {
                o = angular.copy(BWL.Model[modelName]);
            }
            if (angular.isDefined(tmpAttrs) && tmpAttrs !== null) angular
                    .extend(o, tmpAttrs);

            return o;
        }
    }
});