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
    }
  }
});