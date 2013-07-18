azureTicketsApp.directive('toggleExpand', function () {

    return   {
        restrict: 'A',
        $scope: '=',

        link: function ($scope, elem, attrs) {
            //$.each(attrs, function(key, element) {console.log('key: ' + key + '\n' + 'value: ' + element);});
            var $wcontent = elem.parent().parent().next('.widget-content');

            elem.click(function(e) {
                e.preventDefault();
                elem.children('i').toggleClass('icon-chevron-down');
                elem.children('i').toggleClass('icon-chevron-up');
                $wcontent.toggle(500);
            });

        }
    }
});

azureTicketsApp.directive('closeWidget', function () {

    return   {
        restrict: 'A',
        scope: '=',

        link: function ($scope, elem, attrs) {
            elem.click(function (e) {
                e.preventDefault();
                var $wbox = elem.parent().parent().parent();
                $wbox.hide(100);
            });
        }
    }
});
