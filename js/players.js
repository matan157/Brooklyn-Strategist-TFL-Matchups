(function() {
    var app = angular.module('playersModule', []);

    app.service('PlayerService', function($http) {
        var getPlayers = function() {
            var url = 'js/players.json';
            return $http.get(url).then(function success(response) {
                return response.data.players;
            }, function error(response) {
                console.log(response);
            });
        };
        return { getPlayers: getPlayers };
    });

    app.directive('playerRoster', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/players.html',
            controller: 'PlayersController',
            controllerAs: 'playersCtrl'
        };
    });

    app.controller('PlayersController', ['PlayerService', function(PlayerService) {
        var self = this;
        var show = false;
        var getPlayers = PlayerService.getPlayers();
        getPlayers.then(function(response) {
            self.players = response;
        });

        $('#show-hide').click(function() {
            show = !show;
            if (show) {
                $('#show-hide').html('Hide');
            } else {
                $('#show-hide').html('Show');
            }
            $('#show-hide').trigger('blur');
        });
    }]);
})();