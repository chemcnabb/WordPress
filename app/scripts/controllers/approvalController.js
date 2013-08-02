function approvalController($scope, $cookieStore, $routeParams, pendingService) {
    $scope.pending = pendingService;
    $scope.approvalKey = $routeParams.approvalKey;


    $scope.loadAccessPending = function () {
        $scope.pending.loadAccessPending().then(function () {
            $scope.accessPendingList = $scope.pending.getAccessPending();

            // TODO: move this out and make retrieving a single request it's own method
            if (angular.isDefined($routeParams.approvalKey)) {
                $scope.pendingRequest = $scope.object.grep($scope.accessPendingList, 'Key',
                    $routeParams.approvalKey);
            }

        }, function (err) {
            $scope.error.log(err);
        });
    };


}
approvalController.$inject = [
    '$scope', '$cookieStore', '$routeParams', 'pendingService'
];