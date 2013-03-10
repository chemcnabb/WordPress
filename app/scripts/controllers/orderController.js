function orderController($scope, configService, authService, permService,
        modelService) {
    $scope.config = configService, $scope.name = 'order';

    /**
     * models in play here.
     * 
     * @todo inject models, using array of strings maybe.
     */
    $scope.DomainProfile = authService.getDomainProfile();

    $scope.init = function() {
        authService.authenticate($scope).then(function() {
        }, function(err) {

        });
    }
}

orderController.$inject = [
        '$scope', 'configService', 'authService', 'permService', 'modelService'
];