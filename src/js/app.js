var app = {};
(function (angular) {
    'use strict';
    angular.module('app', ['ngRoute', 'highcharts-ng']).config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/animals/:animalId', {
                controller: 'AnimalCtrl',
                templateUrl: 'partials/animal.html'
            })
            .when('/animals', {
                controller: 'AnimalListCtrl',
                templateUrl: 'partials/animalList.html'
            })
            .when('/intro', {
                controller: 'IntroCtrl',
                templateUrl: 'partials/intro.html'
            })
            .otherwise({
                redirectTo: '/animals/aedes_albopictus'
            });
    });
})(angular);