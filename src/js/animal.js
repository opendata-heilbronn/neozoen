(function (angular, app) {
    'use strict';

    var filterAnimals = function (animals) {
        var filteredAnimals = [];
        animals.forEach(function (animal) {
            if (filteredAnimals.length < 30) {
                filteredAnimals.push(animal);
            }
        });
        return filteredAnimals;
    };

    angular.module('app').controller('AnimalListCtrl', function ($scope) {
        $scope.animals = filterAnimals(app.animals);
    });

    angular.module('app').controller('AnimalCtrl', function ($scope, $routeParams, $location) {
        $scope.animals = filterAnimals(app.animals);

        var activeAnimal = _.find($scope.animals, function (animal) {
            return animal.iD === $routeParams.animalId;
        });
        $scope.activeIndex = _.indexOf($scope.animals, activeAnimal);

        $scope.$watch('activeIndex', function () {
            if ($scope.activeIndex && $scope.animals[$scope.activeIndex]) {
                $location.path('/animals/' + $scope.animals[$scope.activeIndex].iD, false);
            }
        });
    });
})(angular, app);