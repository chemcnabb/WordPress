function pagingController($scope){
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.stores.length / $scope.pageSize);
    };
}

azureTicketsApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});