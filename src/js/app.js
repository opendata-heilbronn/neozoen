var app = {};
(function (angular) {
    'use strict';
    angular.module('app.animal', []);
    angular.module('app', ['ngRoute', 'app.animal']).config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/animals/:animalId', {
                controller: 'AnimalCtrl',
                templateUrl: 'partials/animal.html'
            })
            .otherwise({
                redirectTo: '/animals/aedes_albopictus'
            });
    });
})(angular);