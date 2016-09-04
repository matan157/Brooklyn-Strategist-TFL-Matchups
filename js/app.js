(function() {
    var app = angular.module('brooklynStratTFL', ['playersModule', 'pairingsModule', 'ngDialog']);

    app.controller('MainController', ['$scope', 'ngDialog', function($scope, ngDialog) {
        $scope.showRules = function() {
            ngDialog.open({ template: 'templates/rules.html', className: 'ngdialog-theme-plain', scope: $scope });
        };
    }]);

    app.directive('rules', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/rules.html'
        };
    });
})();