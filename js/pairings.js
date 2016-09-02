(function() {
    var app = angular.module('pairingsModule', ['playersModule']);

    app.service('PairingsService', function($http) {
        var getPairings = function() {
            var url = 'js/players.json';
            return $http.get(url).then(function success(response) {
                return response.data.months;
            }, function error(response) {
                console.log(response);
            });
        };
        return { getPairings: getPairings };
    });

    app.directive('pairings', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/pairings.html',
            controller: 'PairingsController',
            controllerAs: 'pairCtrl'
        }
    });

    app.controller('PairingsController', ['PairingsService', '$scope', function(PairingsService, $scope) {
        var self = this;
        self.months = [];
        $scope.tab = 1;

        $scope.setTab = function(n) {
            $scope.tab = n;
        };

        $scope.isSet = function(n) {
            return $scope.tab === n;
        }

        var pairings = PairingsService.getPairings();
        pairings.then(
            function success(res) {
                console.log(res);
                for (var i = 0; i < res.length; i++) {
                    self.months.push(res[i]);
                }
            },
            function error(err) {

            }
        );



    }]);
})();