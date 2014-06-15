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
            .when('/about', {
                controller: 'AboutCtrl',
                templateUrl: 'partials/about.html'
            })
            .otherwise({
                redirectTo: '/intro'
            });
    });

    angular.module('app').run(function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    });
})(angular);