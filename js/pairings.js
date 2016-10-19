(function() {
    var app = angular.module('pairingsModule', ['playersModule', 'schemesStratsModule', 'ngDialog']);

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

    app.controller('PairingsController', ['PairingsService', '$scope', 'Schemes', 'Strategies', 'ngDialog', function(PairingsService, $scope, Schemes, Strategies, ngDialog) {
        var self = this;
        self.months = [];
        var schemes = Schemes.schemes();
        var strategies = Strategies.strategies();

        schemes.then(function(res) {
            $scope.schemes = res;
        });

        strategies.then(function(res) {
            $scope.strategies = res;
        });

        $scope.showSchemeInfo = function(schemeId) {

        };

        $scope.openScheme = function(schemeId) {
            for (var i = 0; i < $scope.schemes.length; i++) {
                if (schemeId === $scope.schemes[i].id) {
                    $scope.scheme = $scope.schemes[i];
                }
            }
            ngDialog.open({ template: 'templates/scheme-modal.html', className: 'ngdialog-theme-plain', scope: $scope });
            $('.scheme').trigger('blur');
        };

        $scope.openStrat = function(strat) {
            $scope.strat = strat;
            ngDialog.open({ template: 'templates/strat-modal.html', className: 'ngdialog-theme-plain', scope: $scope });
            $('button').trigger('blur');
        };

        $scope.openDeploy = function(deploy) {
            $scope.deploy = deploy;
            ngDialog.open({ template: 'templates/deploy-modal.html', className: 'ngdialog-theme-plain', scope: $scope });
            $('button').trigger('blur');
        };

        var month = new Date().getMonth() + 1;

        $scope.tab = month - 8;

        $scope.setTab = function(n) {
            $scope.tab = n;
        };

        $scope.isSet = function(n) {
            return $scope.tab === n;
        };

        var pairings = PairingsService.getPairings();
        pairings.then(
            function success(res) {
                console.log(res);
                for (var i = 0; i < res.length; i++) {
                    self.months.push(res[i]);
                }
            },
            function error(err) {
                console.log(err);
            }
        );
    }]);
})();