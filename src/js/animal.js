(function (angular, app) {
    'use strict';

    angular.module('app.animal').controller('AnimalCtrl', function ($scope, $routeParams) {
        $scope.animals = app.animals
    });
})(angular, app);