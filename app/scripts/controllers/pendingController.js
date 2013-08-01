function pendingController($scope, pendingService, $cookieStore){
    $scope.pending = pendingService;
    $scope.access_pending_list = [];
    $scope.init = function() {
        $scope.pending.loadAccessPending().then(function() {
            $scope.access_pending_list = $scope.pending.getAccessPending();
            console.log('Access Pending:' + $scope.access_pending_list);
        }, function(err) {
            $scope.error.log(err);
        });
    }

}

pendingController.$inject = ['$scope', 'pendingService', '$cookieStore'];