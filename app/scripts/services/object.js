// object service & several utilities
azureTicketsApp.factory('objectService', function() {
  return {
    /**
     * @param {array}
     *          arr Array to manipulate
     * @param {array}
     *          els Elements that need to be positioned first
     * @param {string}
     *          prop Optional property to lookup when elements are objects.
     * @returns {array}
     */
    prioritizeSort : function(arr, els, prop) {
      var cc = [];
      var ret = arr.filter(function(_c) {
        if (els.indexOf((angular.isDefined(prop) ? _c[prop] : _c)) !== -1) {
          cc.push(_c);
          return false;
        }
        return true;
      });

      return cc.concat(ret);
    },
    /**
     * Iterates over array of objects and returns the element's whose property
     * prop is equal to val.
     * 
     * @param arr
     *          {array}
     * @param prop
     *          {string}
     * @param val
     *          {mixed}
     * @returns {object}
     */
    grep : function(arr, prop, val) {
      var ret = null;

      if (angular.isArray(arr)) {
        angular.forEach(arr, function(v, k) {
          if (angular.isDefined(v[prop])) {
            if (angular.equals(v[prop], val)) {
              ret = v;
            }
          }
        });
      }

      return ret;
    }
  }
});