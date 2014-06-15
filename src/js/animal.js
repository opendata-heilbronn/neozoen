(function (angular, app) {
    'use strict';

    angular.module('app').controller('AnimalListCtrl', function ($scope) {
        $scope.animals = app.animals;
    });

    angular.module('app').controller('AnimalCtrl', function ($scope, $routeParams, $location) {
        $scope.animals = app.animals;

        var activeAnimal = _.find($scope.animals, function (animal) {
            return animal.id === $routeParams.animalId;
        });
        $scope.activeIndex = _.indexOf($scope.animals, activeAnimal);

        $scope.$watch('activeIndex', function () {
            $location.path('/animals/' + $scope.animals[$scope.activeIndex].id, false);
        })
    });
})(angular, app);