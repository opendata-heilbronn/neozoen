(function (angular, app) {
    'use strict';

    angular.module('app').controller('IntroCtrl', function ($scope) {
        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'area'
                },
                yAxis: {
                    title: null
                }
            },
            series: [
                {
                    name: 'Pflanzen',
                    data: [1477, 1564, 1704, 1829, 1883, 1998, 2148, 2245, 2353, 2453, 2487, 1063]
                },
                {
                    name: 'Wirbelose Tiere',
                    data: [92, 110, 193, 229, 262, 422, 491, 605, 783, 1009, 1039, 568]
                },
                {
                    name: 'Wirbeltiere',
                    data: [63, 65, 76, 87, 90, 105, 121, 134, 161, 247, 251, 80]
                }
            ],
            loading: false,
            xAxis: {
                categories: ['1900-1909', '1910-1919', '1920-1929', '1930-1939', '1940-1949', '1950-1959', '1960-1969', '1970-1979', '1980-1989', '1990-1999', '2000-2008', 'Not known'],
                labels: {
                    enabled: false
                }
            },
            title: {
                text: null
            }
        }
    });
})(angular, app);