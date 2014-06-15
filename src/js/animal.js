(function (angular, app) {
    'use strict';

    angular.module('app').controller('AnimalCtrl', function ($scope, $routeParams) {
        $scope.animals = app.animals
    });
})(angular, app);