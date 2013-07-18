azureTicketsApp.directive('toggleExpand', function () {

    return   {
        restrict: 'A',
        scope: '=',

        link: function (scope, elem, attrs) {
            elem.click(function(e){
                e.preventDefault();
                console.log(e);
                console.log(elem);
                var $wcontent = elem.parent().parent().next('.widget-content');
                var icon_base = elem.children('i').attr('class').replace('-up', '').replace('-down', '');
                console.log(icon_base+'-up');
                console.log(icon_base+'-down');
                if(scope.toggleDashboard ||
                    scope.toggleTodayStatus ||
                    scope.toggleChats ||
                    scope.toggleFileUpload ||
                    scope.toggleBrowsers ||
                    scope.toggleProject)
                {
                    elem.children('i').removeClass(icon_base+'-up');
                    elem.children('i').addClass(icon_base+'-down');
                }
                else
                {
                    elem.children('i').removeClass(icon_base+'-down');
                    elem.children('i').addClass(icon_base+'-up');
                }
                $wcontent.toggle(500);
            });
        }
    }
});
