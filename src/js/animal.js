(function (angular, app) {
    'use strict';

    angular.module('app').controller('AnimalListCtrl', function ($scope) {
        $scope.animals = app.animals;
    });

    angular.module('app').controller('AnimalCtrl', function ($scope, $routeParams) {
        $scope.animals = app.animals;

        for (var index = 0; index < $scope.animals.length; index++) {
            if ($scope.animals[index].id === $routeParams.animalId) {
                $scope.activeIndex = index;
            }
        }
    });
})(angular, app);