(function() {
    var app = angular.module('schemesStratsModule', ['ngDialog']);

    app.service('Schemes', function($http) {
        var schemes = function() {
            var url = 'js/gaininggrounds.json';
            return $http.get(url).then(
                function success(res) {
                    return res.data.schemes;
                },
                function error(err) {
                    console.log(err);
                }
            );
        };

        return { schemes: schemes };
    });

    app.service('Strategies', function($http) {
        var strategies = function() {
            return $http.get('js/gaininggrounds.json').then(
                function success(res) {
                    return res.data.strategies;
                },
                function error(err) {
                    console.log(err);
                }
            );
        };
        return { strategies: strategies };
    });

    app.controller('SchStratController', ['$scope', 'ngDialog', function($scope, ngDialog) {}]);
})();